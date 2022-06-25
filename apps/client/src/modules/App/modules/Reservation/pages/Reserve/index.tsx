import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { View, TextInput as RNTextInput, FlatList } from 'react-native';
import { Button, Text, TextInput, Checkbox, Caption } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
import { SizedBox } from '~/components/SizedBox';
import { AppReservationReserveTimeCardComponent } from '../../components/TimeCard';

type DateTimePickerModes = 'date' | 'time';
type TimePickerModes = 'start' | 'end';

const baseDate = new Date();
// two hours range from now
const minimumDate = new Date(baseDate).setHours(baseDate.getHours() + 2);
// one week range from now
const maximumDate = new Date(
  new Date(new Date(baseDate).setDate(baseDate.getDate() + 7)).setHours(23)
).setMinutes(59);

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

export function AppReservationReservePage() {
  const dayInputRef = useRef<RNTextInput>(null);
  const startTimeInputRef = useRef<RNTextInput>(null);
  const endTimeInputRef = useRef<RNTextInput>(null);
  const [date, setDate] = useState<Date>(null);
  const [startTime, setStartTime] = useState<Date>(null);
  const [endTime, setEndTime] = useState<Date>(null);
  const [mode, setMode] = useState<DateTimePickerModes>('date');
  const [timeMode, setTimeMode] = useState<TimePickerModes>('start');
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [isMaximumStayChecked, setIsMaximumStayChecked] = useState(false);
  const [timeList, setTimeList] = useState(TIME_LIST);

  const isStartTimeInputDisabled = useMemo(() => !date, [date]);
  const isEndTimeInputDisabled = useMemo(
    () => !(!!date && !!startTime && !isMaximumStayChecked),
    [date, startTime]
  );
  const isMaximumStayCheckedDisabled = useMemo(
    () => !(!!date && !!startTime),
    [date, startTime]
  );

  // useEffect(() => {
  //   console.log(date, !isStartTimeInputDisabled);
  //   if (date && !isStartTimeInputDisabled) {
  //     startTimeInputRef.current?.focus();
  //   }
  // }, [startTime, isStartTimeInputDisabled]);

  function showDateTimePicker(
    _mode: DateTimePickerModes,
    _timeMode: TimePickerModes
  ) {
    setMode(_mode);
    setTimeMode(_timeMode);
    setIsDateTimePickerVisible(true);
  }

  function hideDateTimePicker() {
    setIsDateTimePickerVisible(false);
  }

  function onDatePickerChange(_date?: Date) {
    if (_date) {
      setDate(_date);
    }
    dayInputRef.current?.blur();
    startTimeInputRef.current?.focus();
  }

  // function onTimePickerChange(_date?: Date, _timeMode: TimePickerModes) {
  //   if (_date) {
  //     if (_timeMode === 'start') {
  //       setStartTime(_date);
  //       startTimeInputRef.current?.blur();
  //     } else if (_timeMode === 'end') {
  //       setEndTime(_date);
  //       endTimeInputRef.current?.blur();
  //     } else {
  //       //
  //     }
  //   }
  // }

  const onDateTimePickerChange = useCallback(
    (_event, _date?: Date) => {
      if (mode === 'date') {
        onDatePickerChange(_date);
      }
      // else if (mode === 'time') {
      //   onTimePickerChange(_date, timeMode);
      // } else {
      //   //
      // }
      hideDateTimePicker();
    },
    [mode, timeMode]
  );

  const handleSetIsMaximumStayChecked = useCallback(() => {
    setIsMaximumStayChecked((prev) => {
      const newIsMaximumStayChecked = !prev;

      if (newIsMaximumStayChecked === true) {
        // setEndTime(new Date(startTime).setHours(startTime?.getHours() + 2));
      } else {
        setEndTime('');
      }

      return newIsMaximumStayChecked;
    });
  }, [startTime]);

  const onTimeCardPress = useCallback(
    (_time) => {
      if (timeMode === 'start') {
        setStartTime(_time);
      }

      if (timeMode === 'end') {
        setEndTime(_time);
      }
    },
    [timeMode]
  );

  return (
    <View style={styles.container}>
      <View style={{ flexGrow: 0 }}>
        <TextInput
          ref={dayInputRef}
          label='Dia'
          showSoftInputOnFocus={false}
          onFocus={() => {
            showDateTimePicker('date');
          }}
          value={date?.toLocaleDateString() ?? ''}
          // value={mask(formik.values.cpf, ['999.999.999-99'])}
          // onChangeText={formik.handleChange('cpf')}
          // onBlur={formik.handleBlur('cpf')}
          // onSubmitEditing={() => {
          //   scrollRef.current?.scrollToEnd();
          // }}
        />
        <SizedBox />
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
              // onTouchStart={() => {
              // }}
              onFocus={() => {
                console.log('aaa');
                setTimeMode('start');
                //   showDateTimePicker('time', 'start');
              }}
              value={startTime?.toLocaleTimeString() ?? ''}
              // disabled={isStartTimeInputDisabled}
            />
          </View>
          <SizedBox />
          <View style={{ flex: 0.5 }}>
            <TextInput
              ref={endTimeInputRef}
              label='Saída'
              showSoftInputOnFocus={false}
              // onTouchStart={() => {
              //   showDateTimePicker('time', 'end');
              // }}
              onFocus={() => {
                console.log('bbb');
                setTimeMode('end');
              }}
              value={endTime?.toLocaleTimeString() ?? ''}
              // disabled={isEndTimeInputDisabled}
            />
          </View>
        </View>
        <SizedBox />
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
        <Caption>O tempo de permanência máxima é de X horas.</Caption>
      </View>
      <SizedBox />
      <FlatList
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
      />
      {isDateTimePickerVisible && (
        <DateTimePicker
          mode={mode}
          value={date ?? new Date()}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          onChange={onDateTimePickerChange}
        />
      )}
      <Button mode='contained'>Confirmar</Button>
    </View>
  );
}
