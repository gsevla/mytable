import { AppPageWrapper } from 'components/AppPageWrapper';
import React, { useCallback, useMemo } from 'react';
import { DataTable } from 'react-native-paper';
import { ReservationOrderStatus } from '@mytable/domain';
import { View } from 'react-native';
import { Icon, SizedBox, Text } from '@mytable/components';
import { useReservationOrder } from '#/hooks/api/reservationOrder/useReservationOrder';
import { Item, Menu } from '#/components/Menu';
import { useUpdateReservationOrder } from '#/hooks/api/reservationOrder/useUpdateReservationOrder';

const statusMap = {
  [ReservationOrderStatus.ACCEPTED]: 'Aceito',
  [ReservationOrderStatus.CANCELED]: 'Cancelado',
  [ReservationOrderStatus.DONE]: 'Finalizado',
  [ReservationOrderStatus.PENDING]: 'Pendente',
  [ReservationOrderStatus.REJECTED]: 'Rejeitado',
};

export default function AppReservationOrderPage() {
  const { data: reservationOrder, isLoading } = useReservationOrder();

  const { mutate } = useUpdateReservationOrder();

  const mountReservationOrderStatusItems = useCallback(
    (reservationOrderId: number) =>
      Object.entries(statusMap).map(([key, value]) => ({
        key,
        label: value,
        action: (item: Item) => {
          mutate({
            id: reservationOrderId,
            status: item.key,
          });
        },
      })),
    []
  );

  const shouldShowTable = useMemo(() => {
    if (!reservationOrder) return false;

    return reservationOrder.length > 0;
  }, [reservationOrder]);

  return (
    <AppPageWrapper isLoading={isLoading}>
      {shouldShowTable ? (
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Cliente</DataTable.Title>
            <DataTable.Title>Data</DataTable.Title>
            <DataTable.Title>Status</DataTable.Title>
            <DataTable.Title numeric>Quantidade</DataTable.Title>
          </DataTable.Header>

          {reservationOrder?.map((item) => (
            <DataTable.Row key={`reservation-order-${item.id}`}>
              <DataTable.Cell>
                {item.client.name} {item.client.surname}
              </DataTable.Cell>
              <DataTable.Cell>
                {item.date}
                {`\n`}
                {item.startTime} ~ {item.endTime}
              </DataTable.Cell>
              <DataTable.Cell>
                <Menu items={mountReservationOrderStatusItems(item.id)}>
                  <View style={{ flexDirection: 'row' }}>
                    <>{statusMap[item.status as ReservationOrderStatus]}</>
                    <SizedBox w={4} />
                    <Icon
                      name='chevron-down'
                      size={16}
                    />
                  </View>
                </Menu>
              </DataTable.Cell>
              <DataTable.Cell numeric>{item.peopleAmount}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      ) : (
        <View>
          <Text>Não há dados a serem listados.</Text>
        </View>
      )}
    </AppPageWrapper>
  );
}
