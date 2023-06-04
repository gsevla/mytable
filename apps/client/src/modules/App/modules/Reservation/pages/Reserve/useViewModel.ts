import { useReducer } from 'react';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const TZ_OFFSET = -3 * 60 * 60 * 1000; // br offset = -3
const TZ_OFFSET_IN_MINUTES = -3 * 60; // br offset = -3

const baseDate = new Date(new Date().getTime() + TZ_OFFSET);
// two hours range from now
const minimumDate = new Date(baseDate.getTime());
minimumDate.setHours(baseDate.getHours() + 2);
// two week range from now
const maximumDate = new Date(
  new Date(new Date(baseDate).setDate(baseDate.getDate() + 14)).setHours(23)
);
maximumDate.setMinutes(59);

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
      const date = new Date(payload.date);

      const dateLabel = `${date.getDate().toString().padStart(2, '0')}/${date
        .getMonth()
        .toString()
        .padStart(2, '0')}/${date.getFullYear()}`;

      return {
        ...state,
        ...(Platform.OS !== 'ios'
          ? {
              isEndTimePickerVisible: false,
            }
          : {}),
        date,
        dateLabel,
      };
    }
    case 'setStartTime': {
      const startTime = new Date(payload.startTime);

      const startTimeLabel = `${startTime
        .getHours()
        .toString()
        .padStart(2, '0')}:${startTime
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;

      return {
        ...state,
        ...(Platform.OS !== 'ios'
          ? {
              isEndTimePickerVisible: false,
            }
          : {}),
        startTime,
        startTimeLabel,
      };
    }
    case 'setEndTime': {
      const endTime = new Date(payload.endTime);

      const endTimeLabel = `${endTime
        .getHours()
        .toString()
        .padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;

      return {
        ...state,
        ...(Platform.OS !== 'ios'
          ? {
              isEndTimePickerVisible: false,
            }
          : {}),
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

const initialState = {
  isEnvironmentPickerVisible: false,
  selectedEnvironment: null,
  isDatePickerVisible: false,
  isStartTimePickerVisible: false,
  isEndTimePickerVisible: false,
  dateTimePickerMode: 'date', // 'date' | 'time'
  dateLabel: '',
  timeMode: 'start', // 'start' | 'end'
  startTimeLabel: '',
  endTimeLabel: '',
  peopleAmount: '',
  ...(Constants?.manifest?.extra?.PLATFORM === 'web'
    ? {
        date: '',
        startTime: '',
        endTime: '',
      }
    : {
        date: new Date(),
        startTime: minimumDate,
        endTime: minimumDate,
      }),
};

export function useViewModel() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    dispatch,
    TZ_OFFSET,
    TZ_OFFSET_IN_MINUTES,
    baseDate,
    minimumDate,
    maximumDate,
  };
}
