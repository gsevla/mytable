import { Icon, SizedBox } from '@mytable/components';
import { ReservationOrderStatus } from '@mytable/domain';
import { reservationOrderStatusMap } from 'constants/reservationOrderStatusMap';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useUpdateReservationOrder } from '#/hooks/api/reservationOrder/useUpdateReservationOrder';
import { useActiveReservationOrder } from '#/hooks/api/reservationOrder/useActiveReservationOrder';
import { TableColumn, TableRow, TableV2 } from '#/components/TableV2';
import { Item, Menu } from '#/components/Menu';

const columns: Array<TableColumn> = [
  {
    title: 'Cliente',
    itemNameReference: 'clientName',
  },
  {
    title: 'Data',
    itemNameReference: 'date',
  },
  {
    title: 'Estado',
    itemNameReference: 'state',
  },
  {
    title: 'Qtde. Pessoas',
    itemNameReference: 'peopleAmount',
    isNumeric: true,
    widthMultiplier: 0.6,
    spacing: {
      right: 24,
    },
  },
];

export function ActiveReservationTab() {
  const router = useRouter();

  const { data: reservationOrder, isLoading } = useActiveReservationOrder();

  const { mutate } = useUpdateReservationOrder();

  const mountReservationOrderStatusItems = useCallback(
    (reservationOrderId: number) =>
      Object.entries(reservationOrderStatusMap).map(([key, value]) => ({
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

  const tabulatedReservationOrder = useMemo(() => {
    if (!reservationOrder) return [];

    return reservationOrder.map(
      (order) =>
        ({
          id: order.id.toString(),
          data: {
            clientName: `${order.client.name} ${order.client.surname}`,
            date: `${order.date}\n${order.startTime} ~ ${order.endTime}`,
            state: (
              <Menu items={mountReservationOrderStatusItems(order.id)}>
                <View style={{ flexDirection: 'row' }}>
                  <>
                    {
                      reservationOrderStatusMap[
                        order.status as ReservationOrderStatus
                      ]
                    }
                  </>
                  <SizedBox w={4} />
                  <Icon
                    name='chevron-down'
                    size={16}
                  />
                </View>
              </Menu>
            ),
            peopleAmount: order.peopleAmount,
          },
        } as TableRow)
    );
  }, [reservationOrder, mountReservationOrderStatusItems]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 24 }}>
      <TableV2
        columns={columns}
        data={tabulatedReservationOrder}
        actionButtons={[
          {
            iconName: 'pencil',
            action: (item) => {
              router.push(`${router.route}/edit/${item.id}`);
            },
          },
        ]}
      />
    </View>
  );
}
