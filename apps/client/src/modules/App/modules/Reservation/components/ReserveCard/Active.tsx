import { ReservationOrderWithEnvironmentData } from '@mytable/domain';
import React, { useState } from 'react';
import { View } from 'react-native';
import { IconButton, Subheading, Title } from 'react-native-paper';
import {
  DialogWithConfirmation,
  SizedBox,
  Text,
  Paper,
} from '@mytable/components';
import { reservationOrderStatusEnumString } from '../../constants';
import { styles } from './styles';
import { useCancelReservationOrder } from '#hooks/api/reservationOrder/useCancelReservationOrder';

interface Props {
  reservation: ReservationOrderWithEnvironmentData;
}

export function AppReservationReserveActiveCardComponent({
  reservation,
}: Props) {
  const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] =
    useState(false);

  function showConfirmationDialog() {
    setIsConfirmationDialogVisible(true);
  }

  function hideConfirmationDialog() {
    setIsConfirmationDialogVisible(false);
  }

  const { mutate: cancelReservationOrder } = useCancelReservationOrder({
    onSettled: () => {
      hideConfirmationDialog();
    },
  });

  return (
    <Paper style={styles.container}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Title style={{}}>
            {reservationOrderStatusEnumString[reservation.status]}
          </Title>
          <Subheading style={{ fontWeight: 'bold' }}>Ambiente</Subheading>
          <Text>{reservation.environment.name}</Text>
          <SizedBox />
          <Subheading style={{ fontWeight: 'bold' }}>Dia</Subheading>
          <Text>{reservation.date}</Text>
          <SizedBox />
          <Subheading style={{ fontWeight: 'bold' }}>Permanência</Subheading>
          <Text>
            {reservation.startTime} ~ {reservation.endTime}
          </Text>
          <SizedBox />
        </View>
        <View
          style={{
            flexGrow: 0,
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}
        >
          <IconButton
            icon='close'
            onPress={() => {
              showConfirmationDialog();
            }}
          />
        </View>
      </View>
      <DialogWithConfirmation
        visible={isConfirmationDialogVisible}
        message='Você realmente deseja cancelar essa reserva?'
        onCloseDialog={hideConfirmationDialog}
        onConfirmDialog={() => {
          cancelReservationOrder(reservation.id);
        }}
      />
    </Paper>
  );
}
