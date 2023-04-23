import React, { useRef, useMemo, useReducer } from 'react';
import { View, TextInput as RNTextInput, Pressable } from 'react-native';
import { Button, TextInput, Provider, Menu } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon, Text } from '@mytable/components';
import styles from './styles';
import { SizedBox } from '~/components/SizedBox';
import { AppReservationReserveTimeCardComponent } from '../../components/TimeCard';
import { useCreateReservationOrder } from '#hooks/api/reservationOrder/useCreateReservationOrder';
import { useAuthenticatedClient } from '#hooks/storage/useAuthenticatedClient';
import { useRestaurantWithInfo } from '#hooks/api/restaurant/useRestaurantWithInfo';
import LoadingScreen from '~/pages/Loading';
import { goBack } from '~/services/navigation';

const TZ_OFFSET = -3 * 60 * 60 * 1000; // br offset = -3

const baseDate = new Date(new Date().getTime() + TZ_OFFSET);
// two hours range from now
const minimumDate = new Date(baseDate.getTime());
minimumDate.setHours(baseDate.getHours() + 2);
// two week range from now
const maximumDate = new Date(
  new Date(new Date(baseDate).setDate(baseDate.getDate() + 14)).setHours(23)
);
maximumDate.setMinutes(59);

const TIME_LIST = [
  {
    index: 1,
    time: '12:00',
    selected: false,
    disabled: false,
  },
  {
    index: 2,
    time: '12:30',
    selected: false,
    disabled: false,
  },
  {
    index: 3,
    time: '13:00',
    selected: false,
    disabled: false,
  },
  {
    index: 4,
    time: '13:30',
    selected: false,
    disabled: false,
  },
  {
    index: 5,
    time: '14:00',
    selected: false,
    disabled: false,
  },
  {
    index: 6,
    time: '14:30',
    selected: false,
    disabled: false,
  },
  {
    index: 7,
    time: '15:00',
    selected: false,
    disabled: false,
  },
  {
    index: 8,
    time: '15:30',
    selected: false,
    disabled: false,
  },
  {
    index: 9,
    time: '16:00',
    selected: false,
    disabled: false,
  },
  {
    index: 10,
    time: '16:30',
    selected: false,
    disabled: false,
  },
  {
    index: 11,
    time: '17:00',
    selected: false,
    disabled: false,
  },
  {
    index: 12,
    time: '17:30',
    selected: false,
    disabled: false,
  },
  {
    index: 13,
    time: '18:00',
    selected: false,
    disabled: false,
  },
  {
    index: 14,
    time: '18:30',
    selected: false,
    disabled: false,
  },
  {
    index: 15,
    time: '19:00',
    selected: false,
    disabled: false,
  },
  {
    index: 16,
    time: '19:30',
    selected: false,
    disabled: false,
  },
  {
    index: 17,
    time: '20:00',
    selected: false,
    disabled: false,
  },
];

const initialState = {
  isEnvironmentPickerVisible: false,
  selectedEnvironment: null,
  isDatePickerVisible: false,
  isStartTimePickerVisible: false,
  isEndTimePickerVisible: false,
  dateTimePickerMode: 'date', // 'date' | 'time'
  date: new Date(),
  dateLabel: '',
  timeMode: 'start', // 'start' | 'end'
  startTime: minimumDate,
  startTimeLabel: '',
  endTime: minimumDate,
  endTimeLabel: '',
  peopleAmount: '',
};

const reducer = (
  state: typeof initialState,
  { type, payload }: { type: string; payload?: unknown }
) => {
  switch (type) {
    case 'selectEnvironment': {
      return {
        ...state,
        selectedEnvironment: payload.environment,
        isEnvironmentPickerVisible: false,
      };
    }
    case 'showEnvironmentPicker': {
      return {
        ...state,
        isEnvironmentPickerVisible: true,
      };
    }
    case 'hideEnvironmentPicker': {
      return {
        ...state,
        isEnvironmentPickerVisible: false,
      };
    }
    case 'showDatePicker': {
      return {
        ...state,
        isDatePickerVisible: true,
        dateTimePickerMode: 'date',
      };
    }
    case 'showStartTimePicker': {
      return {
        ...state,
        isStartTimePickerVisible: true,
        dateTimePickerMode: 'time',
        timeMode: 'start',
      };
    }
    case 'showEndTimePicker': {
      return {
        ...state,
        isEndTimePickerVisible: true,
        dateTimePickerMode: 'time',
        timeMode: 'end',
      };
    }
    case 'setDate': {
      console.log('date', payload.date);
      // const date = new Date(new Date(payload.date).getTime() + TZ_OFFSET);
      const date = new Date(payload.date);
      console.log('date2', date);

      const dateLabel = `${date.getDate().toString().padStart(2, '0')}/${date
        .getMonth()
        .toString()
        .padStart(2, '0')}/${date.getFullYear()}`;

      return {
        ...state,
        isDatePickerVisible: false,
        date,
        dateLabel,
      };
    }
    case 'setStartTime': {
      console.log('startTime', payload.startTime);
      // const startTime = new Date(
      //   new Date(payload.startTime).getTime() + TZ_OFFSET
      // );
      const startTime = new Date(payload.startTime);
      console.log('startTime2', payload.startTime);

      const startTimeLabel = `${startTime
        .getHours()
        .toString()
        .padStart(2, '0')}:${startTime
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;

      return {
        ...state,
        isStartTimePickerVisible: false,
        startTime,
        startTimeLabel,
      };
    }
    case 'setEndTime': {
      // const endTime = new Date(new Date(payload.endTime).getTime() + TZ_OFFSET);
      const endTime = new Date(payload.endTime);

      const endTimeLabel = `${endTime
        .getHours()
        .toString()
        .padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;

      return {
        ...state,
        isEndTimePickerVisible: false,
        endTime,
        endTimeLabel,
      };
    }
    case 'hideDatePicker': {
      return {
        ...state,
        isDatePickerVisible: false,
      };
    }
    case 'hideStartTimePicker': {
      return {
        ...state,
        isStartTimePickerVisible: false,
      };
    }
    case 'hideEndTimePicker': {
      return {
        ...state,
        isEndTimePickerVisible: false,
      };
    }
    case 'setPeopleAmount': {
      const peopleAmount = (payload.peopleAmount as string).replace(
        /[^0-9]/g,
        ''
      );

      return {
        ...state,
        peopleAmount,
      };
    }
    default: {
      return state;
    }
  }
};

export function AppReservationReservePage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dayInputRef = useRef<RNTextInput>(null);
  const startTimeInputRef = useRef<RNTextInput>(null);
  const endTimeInputRef = useRef<RNTextInput>(null);

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
