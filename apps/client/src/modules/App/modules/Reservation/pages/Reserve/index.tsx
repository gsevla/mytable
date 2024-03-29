import React, { useRef, useMemo } from 'react';
import { View, TextInput as RNTextInput, Pressable } from 'react-native';
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
  const { state, dispatch, TZ_OFFSET, minimumDate, maximumDate } =
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
    if (event.type === 'dismissed') {
      dispatch({
        type: 'hideDatePicker',
      });
      dayInputRef.current?.blur();
      return;
    }

    dispatch({
      type: 'setDate',
      payload: {
        date,
      },
    });
    dayInputRef.current?.blur();
    if (state.startTimeLabel === '') {
      startTimeInputRef.current?.focus();
    }
  };

  const onStartTimePickerChange = (event, date) => {
    if (event.type === 'dismissed') {
      dispatch({
        type: 'hideStartTimePicker',
      });
      startTimeInputRef.current?.blur();
      return;
    }

    dispatch({
      type: 'setStartTime',
      payload: {
        startTime: date,
      },
    });
    startTimeInputRef.current?.blur();
    if (state.endTimeLabel === '') {
      endTimeInputRef.current?.focus();
    }
  };

  const onEndTimePickerChange = (event, date) => {
    if (event.type === 'dismissed') {
      dispatch({
        type: 'hideEndTimePicker',
      });
      endTimeInputRef.current?.blur();
      return;
    }

    dispatch({
      type: 'setEndTime',
      payload: {
        endTime: date,
      },
    });
    endTimeInputRef.current?.blur();
  };

  function handleCreateReservationOrder() {
    if (!client) return;

    createReservationOrder({
      clientId: client?.id,
      date: state.dateLabel,
      startTime: state.startTimeLabel,
      endTime: state.endTimeLabel,
      environmentId: state.selectedEnvironment?.id as number,
      peopleAmount: state.peopleAmount && parseInt(state.peopleAmount, 10),
    });
  }

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
              value={state.startTimeLabel}
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
              value={state.endTimeLabel}
            />
          </View>
        </View>
        <SizedBox h={48} />
        <TextInput
          label='Quantidade de pessoas'
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
      </View>
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
          timeZoneOffsetInSeconds={TZ_OFFSET}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          onChange={onDatePickerChange}
        />
      )}
      {state.isStartTimePickerVisible && (
        <DateTimePicker
          mode='time'
          is24Hour
          timeZoneOffsetInSeconds={TZ_OFFSET}
          value={state.startTime}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          onChange={onStartTimePickerChange}
        />
      )}
      {state.isEndTimePickerVisible && (
        <DateTimePicker
          mode='time'
          is24Hour
          timeZoneOffsetInSeconds={TZ_OFFSET}
          value={state.endTime}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          onChange={onEndTimePickerChange}
        />
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
