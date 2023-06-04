import React, { useRef, useMemo } from 'react';
import {
  View,
  TextInput as RNTextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { Button, TextInput, Provider, Menu } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon, Text } from '@mytable/components';
import styles from './styles';
import { SizedBox } from '~/components/SizedBox';
import { useCreateReservationOrder } from '#hooks/api/reservationOrder/useCreateReservationOrder';
import { useAuthenticatedClient } from '#hooks/storage/useAuthenticatedClient';
import { useRestaurantWithInfo } from '#hooks/api/restaurant/useRestaurantWithInfo';
import LoadingScreen from '~/pages/Loading';
import { goBack } from '~/services/navigation';
import { useSnackbar } from '#hooks/useSnackbar';
import { useViewModel } from './useViewModel';

export function AppReservationReservePage() {
  const { state, dispatch, TZ_OFFSET_IN_MINUTES, minimumDate, maximumDate } =
    useViewModel();

  const dayInputRef = useRef<RNTextInput>(null);
  const startTimeInputRef = useRef<RNTextInput>(null);
  const endTimeInputRef = useRef<RNTextInput>(null);

  const { showSnackbar } = useSnackbar();
  const client = useAuthenticatedClient();
  const { data: restaurant, isLoading: isRestaurantLoading } =
    useRestaurantWithInfo();
  const {
    mutate: createReservationOrder,
    isLoading: isCreatingReservationOrder,
  } = useCreateReservationOrder({
    onSuccess: () => {
      goBack();
    },
    onError: (error) => {
      showSnackbar(error?.error?.message ?? 'Ops! Tente novamente mais tarde!');
    },
  });

  const environments = useMemo(
    () => restaurant?.environments ?? [],
    [restaurant]
  );

  const isConfirmButtonEnabled = useMemo(
    () =>
      state.dateLabel &&
      state.startTimeLabel &&
      state.endTimeLabel &&
      state.selectedEnvironment &&
      state.peopleAmount &&
      !isCreatingReservationOrder,
    [
      state.dateLabel,
      state.startTimeLabel,
      state.endTimeLabel,
      state.selectedEnvironment,
      state.peopleAmount,
      isCreatingReservationOrder,
    ]
  );

  const onDatePickerChange = (event, date) => {
    // if (event.type === 'dismissed') {
    //   dispatch({
    //     type: 'hideDatePicker',
    //   });
    //   dayInputRef.current?.blur();
    //   return;
    // }

    dispatch({
      type: 'setDate',
      payload: {
        date,
      },
    });
    // dayInputRef.current?.blur();
    // if (state.startTimeLabel === '') {
    //   startTimeInputRef.current?.focus();
    // }
  };

  const onStartTimePickerChange = (event, date) => {
    // if (event.type === 'dismissed') {
    //   dispatch({
    //     type: 'hideStartTimePicker',
    //   });
    //   startTimeInputRef.current?.blur();
    //   return;
    // }

    dispatch({
      type: 'setStartTime',
      payload: {
        startTime: date,
      },
    });
    // startTimeInputRef.current?.blur();
    // if (state.endTimeLabel === '') {
    //   endTimeInputRef.current?.focus();
    // }
  };

  const onEndTimePickerChange = (event, date) => {
    // if (event.type === 'dismissed') {
    //   dispatch({
    //     type: 'hideEndTimePicker',
    //   });
    //   endTimeInputRef.current?.blur();
    //   return;
    // }

    dispatch({
      type: 'setEndTime',
      payload: {
        endTime: date,
      },
    });
    // endTimeInputRef.current?.blur();
  };

  function handleCreateReservationOrder() {
    if (!client) return;

    console.log('## values\n', {
      clientId: client?.id,
      date: state.dateLabel,
      startTime: state.startTimeLabel,
      endTime: state.endTimeLabel,
      environmentId: state.selectedEnvironment?.id as number,
      peopleAmount: state.peopleAmount && parseInt(state.peopleAmount, 10),
    });

    createReservationOrder({
      clientId: client?.id,
      date: state.dateLabel,
      startTime: state.startTimeLabel,
      endTime: state.endTimeLabel,
      environmentId: state.selectedEnvironment?.id as number,
      peopleAmount: state.peopleAmount && parseInt(state.peopleAmount, 10),
    });
  }

  function dismissAll() {
    dispatch({
      type: 'hideDatePicker',
    });
    dayInputRef.current?.blur();
    dispatch({
      type: 'hideStartTimePicker',
    });
    startTimeInputRef.current?.blur();

    dispatch({
      type: 'hideEndTimePicker',
    });
    endTimeInputRef.current?.blur();
  }

  // const handleSetIsMaximumStayChecked = useCallback(() => {
  //   setIsMaximumStayChecked((prev) => {
  //     const newIsMaximumStayChecked = !prev;

  //     if (newIsMaximumStayChecked === true) {
  //       // setEndTime(new Date(startTime).setHours(startTime?.getHours() + 2));
  //     } else {
  //       setEndTime('');
  //     }

  //     return newIsMaximumStayChecked;
  //   });
  // }, [startTime]);

  // const onTimeCardPress = useCallback(
  //   (_time) => {
  //     if (timeMode === 'start') {
  //       setStartTime(_time);
  //     }

  //     if (timeMode === 'end') {
  //       setEndTime(_time);
  //     }
  //   },
  //   [timeMode]
  // );

  if (isRestaurantLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={{ flexGrow: 0, flexDirection: 'row', alignItems: 'center' }}
        onPress={() => {
          dispatch({
            type: 'showEnvironmentPicker',
          });
        }}
      >
        <Text>
          {state?.selectedEnvironment?.name ?? 'Selecione um ambiente'}
        </Text>
        <SizedBox w={4} />
        <Icon
          name='chevron-down'
          size={16}
        />
      </Pressable>
      <SizedBox h={48} />
      <View style={{ flexGrow: 0 }}>
        <TextInput
          ref={dayInputRef}
          label='Dia'
          showSoftInputOnFocus={false}
          onFocus={() => {
            dispatch({
              type: 'showDatePicker',
            });
          }}
          onBlur={() => {
            dispatch({
              type: 'hideDatePicker',
            });
          }}
          value={state.dateLabel}
        />
        <SizedBox h={24} />
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'stretch',
          }}
        >
          <View style={{ flex: 0.5 }}>
            <TextInput
              ref={startTimeInputRef}
              label='Chegada'
              showSoftInputOnFocus={false}
              onFocus={() => {
                dispatch({
                  type: 'showStartTimePicker',
                });
              }}
              onBlur={() => {
                dispatch({
                  type: 'hideStartTimePicker',
                });
              }}
              value={state.startTimeLabel}
              // disabled={isStartTimeInputDisabled}
            />
          </View>
          <SizedBox h={48} />
          <View style={{ flex: 0.5 }}>
            <TextInput
              ref={endTimeInputRef}
              label='Saída'
              showSoftInputOnFocus={false}
              onFocus={() => {
                dispatch({
                  type: 'showEndTimePicker',
                });
              }}
              onBlur={() => {
                dispatch({
                  type: 'hideEndTimePicker',
                });
              }}
              value={state.endTimeLabel}
              // disabled={isEndTimeInputDisabled}
            />
          </View>
        </View>
        <SizedBox h={48} />
        <TextInput
          // ref={dayInputRef}
          label='Quantidade de pessoas'
          // showSoftInputOnFocus={false}
          keyboardType='decimal-pad'
          onChangeText={(text) => {
            dispatch({
              type: 'setPeopleAmount',
              payload: {
                peopleAmount: text,
              },
            });
          }}
          value={state.peopleAmount}
        />
        {/* <SizedBox />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox
            disabled={isMaximumStayCheckedDisabled}
            status={isMaximumStayChecked ? 'checked' : 'unchecked'}
            onPress={() => {
              // setIsMaximumStayChecked((prev) => !prev);
              handleSetIsMaximumStayChecked();
            }}
          />
          <Text>Permanência máxima</Text>
        </View>
        <Caption>O tempo de permanência máxima é de X horas.</Caption> */}
      </View>
      {/* <SizedBox /> */}
      {/* <FlatList
        data={timeList}
        keyExtractor={(item) => item.index.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: 8 }}>
            <AppReservationReserveTimeCardComponent
              time={item.time}
              onPress={onTimeCardPress}
            />
          </View>
        )}
        style={{
          alignSelf: 'center',
          marginVertical: 16,
        }}
        ItemSeparatorComponent={SizedBox}
      /> */}
      <Provider>
        <Menu
          visible={state.isEnvironmentPickerVisible}
          onDismiss={() => {
            dispatch({
              type: 'hideEnvironmentPicker',
            });
          }}
          contentStyle={{
            backgroundColor: '#ccc',
            zIndex: 999,
          }}
          anchor={{
            x: 96,
            y: 36,
          }}
        >
          {environments.map((environment) => (
            <Menu.Item
              key={environment.id}
              title={environment.name}
              titleStyle={{
                color: '#000',
              }}
              onPress={() => {
                dispatch({
                  type: 'selectEnvironment',
                  payload: {
                    environment,
                  },
                });
              }}
            />
          ))}
        </Menu>
      </Provider>
      {state.isDatePickerVisible && (
        <DateTimePicker
          mode='date'
          value={state.date}
          timeZoneOffsetInMinutes={TZ_OFFSET_IN_MINUTES}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          display='spinner'
          onChange={onDatePickerChange}
        />
      )}
      {state.isStartTimePickerVisible && (
        <DateTimePicker
          mode='time'
          is24Hour
          // timeZoneOffsetInMinutes={TZ_OFFSET_IN_MINUTES}
          value={state.startTime}
          // minimumDate={minimumDate}
          // maximumDate={maximumDate}
          display='spinner'
          onChange={onStartTimePickerChange}
        />
      )}
      {state.isEndTimePickerVisible && (
        <DateTimePicker
          mode='time'
          is24Hour
          // timeZoneOffsetInMinutes={TZ_OFFSET_IN_MINUTES}
          value={state.endTime}
          // minimumDate={minimumDate}
          // maximumDate={maximumDate}
          display='spinner'
          onChange={onEndTimePickerChange}
        />
      )}
      {(state.isDatePickerVisible ||
        state.isStartTimePickerVisible ||
        state.isEndTimePickerVisible) && (
        <TouchableOpacity
          style={{ alignItems: 'center' }}
          onPress={dismissAll}
          activeOpacity={0.6}
        >
          <Icon
            name='close'
            size={36}
          />
          <SizedBox h={8} />
        </TouchableOpacity>
      )}
      <Button
        mode='contained'
        disabled={!isConfirmButtonEnabled}
        onPress={handleCreateReservationOrder}
      >
        Confirmar
      </Button>
    </View>
  );
}
