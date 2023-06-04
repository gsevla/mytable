import React, { useRef, useMemo } from 'react';
import { View, TextInput as RNTextInput, Pressable } from 'react-native';
import { Button, TextInput, Provider, Menu } from 'react-native-paper';
import { Icon, Text } from '@mytable/components';
import DateTimePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import styles from './styles';
import { SizedBox } from '~/components/SizedBox';
import { useCreateReservationOrder } from '#hooks/api/reservationOrder/useCreateReservationOrder';
import { useAuthenticatedClient } from '#hooks/storage/useAuthenticatedClient';
import { useRestaurantWithInfo } from '#hooks/api/restaurant/useRestaurantWithInfo';
import LoadingScreen from '~/pages/Loading';
import { goBack } from '~/services/navigation';
import { useSnackbar } from '#hooks/useSnackbar';
import { useViewModel } from './useViewModel';

import 'react-datepicker/dist/react-datepicker.css';
import css from './styles.module.css';

registerLocale('ptBR', ptBR);

export function AppReservationReservePage() {
  const { state, dispatch, minimumDate, maximumDate } = useViewModel();

  const dayInputRef = useRef<RNTextInput>(null);

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

  const onDatePickerChange = (date: Date) => {
    dispatch({
      type: 'setDate',
      payload: {
        date,
      },
    });
  };

  const onStartTimePickerChange = (date: Date) => {
    dispatch({
      type: 'setStartTime',
      payload: {
        startTime: date,
      },
    });
  };

  const onEndTimePickerChange = (date: Date) => {
    dispatch({
      type: 'setEndTime',
      payload: {
        endTime: date,
      },
    });
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
        <DateTimePicker
          className={css.picker}
          selected={state.date}
          placeholderText='Dia'
          includeDateIntervals={[
            {
              start: minimumDate,
              end: maximumDate,
            },
          ]}
          locale='ptBR'
          onChange={onDatePickerChange}
          dateFormat='dd/MM/yyyy'
        />
        <SizedBox h={24} />
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'stretch',
          }}
        >
          <View style={{ flex: 0.5 }}>
            <DateTimePicker
              className={`${css.picker} ${css['time-picker']}`}
              locale='ptBR'
              selected={state.startTime}
              onChange={onStartTimePickerChange}
              placeholderText='Chegada'
              timeCaption='Chegada'
              showTimeSelect
              showTimeSelectOnly
              dateFormat='p'
            />
          </View>
          <SizedBox h={48} />
          <View style={{ flex: 0.5, zIndex: 999 }}>
            <DateTimePicker
              className={`${css.picker} ${css['time-picker']}`}
              locale='ptBR'
              selected={state.endTime}
              onChange={onEndTimePickerChange}
              placeholderText='Saída'
              timeCaption='Saída'
              showTimeSelect
              showTimeSelectOnly
              dateFormat='p'
            />
          </View>
        </View>
        <SizedBox h={48} />
        <TextInput
          ref={dayInputRef}
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
          style={{ zIndex: -1 }}
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
