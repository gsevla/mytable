import {
  ReservationOrderWithEnvironmentData,
  ReservationOrderWithReservationOrderHistoryData,
} from '@mytable/domain';
import React from 'react';
import { View } from 'react-native';
import { Subheading, Title } from 'react-native-paper';
import { SizedBox, Text } from '@mytable/components';
import { Paper } from '~/components/Paper';
import { reservationOrderStatusEnumString } from '../../constants';
import { styles } from './styles';

interface Props {
  reservation: ReservationOrderWithEnvironmentData &
    ReservationOrderWithReservationOrderHistoryData;
}

export function AppReservationReserveHistoryCardComponent({
  reservation,
}: Props) {
  const [reservationOrderHistory] = reservation.reservationOrderHistory;

  return (
    <Paper style={styles.container}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
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
          {!!reservationOrderHistory?.reason && (
            <>
              <SizedBox />
              <Subheading style={{ fontWeight: 'bold' }}>Razão</Subheading>
              <Text>{reservationOrderHistory?.reason}</Text>
            </>
          )}
          <SizedBox />
        </View>
      </View>
    </Paper>
  );
}
