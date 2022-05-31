import { ReservationOrderDto } from '@mytable/dtos';
import React from 'react';
import { View } from 'react-native';
import { IconButton, Subheading, Title } from 'react-native-paper';
import { Paper } from '../../../../../../components/Paper';
import { reservationOrderStatusEnumString } from '../../constants';
import { styles } from './styles';

interface Props {
  reservation: ReservationOrderDto.IReservationOrder;
}

export function AppReservationReserveHistoryCardComponent({
  reservation,
}: Props) {
  const date = `${reservation.date.toLocaleDateString(
    'pt-BR'
  )} - ${reservation.date.toLocaleTimeString('pt-BR')}`;

  return (
    <Paper style={styles.container}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <Title style={{}}>
            {reservationOrderStatusEnumString[reservation.status]}
          </Title>
          <View>
            <Subheading>{date}</Subheading>
          </View>
        </View>
        <View
          style={{
            flexGrow: 0,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <IconButton
            icon='information'
            onPress={() => {}}
          />
        </View>
      </View>
    </Paper>
  );
}
