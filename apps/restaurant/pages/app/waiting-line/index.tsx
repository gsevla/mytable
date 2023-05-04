import { AppPageWrapper } from 'components/AppPageWrapper';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Button } from 'react-native-paper';
import { LeaveWaitingQueueInput, WaitingQueueClient } from '@mytable/domain';
import { useWaitingQueue } from '#/hooks/api/waitingQueue/useWaitingQueue';
import { EventsService } from '#/services/events';
import { useAttendWaitingQueue } from '#/hooks/api/waitingQueue/useAttendWaitingQueue';
import { TableColumn, TableRow, TableV2 } from '#/components/TableV2';

const columns = [
  {
    title: 'Posição',
    itemNameReference: 'position',
  },
  { title: 'Nome', itemNameReference: 'name', widthMultiplier: 2 },
  {
    title: 'Identificador',
    itemNameReference: 'identifier',
    widthMultiplier: 2,
  },
  { title: 'Tam. da mesa', itemNameReference: 'tableSize', isNumeric: true },
] as Array<TableColumn>;

export default function AppWaitingLinePage() {
  const { mutate: attendWaitingQueue, isLoading: isAttending } =
    useAttendWaitingQueue();

  const [clientsOnQueue, setClientsOnQueue] = useState<
    Array<WaitingQueueClient>
  >([]);

  useWaitingQueue({
    onSuccess(data) {
      setClientsOnQueue(data?.data ?? []);
    },
  });

  const tabulatedClientsOnQueue = useMemo(() => {
    if (!clientsOnQueue) return [];

    return clientsOnQueue.reduce((accu, clientOnQueue, index) => {
      accu.push({
        id: clientOnQueue.clientIdentifier,
        data: {
          position: index + 1,
          name: clientOnQueue.name,
          identifier: clientOnQueue.clientIdentifier,
          tableSize: clientOnQueue.tableSize,
        },
      });

      return accu;
    }, [] as Array<TableRow>);
  }, [clientsOnQueue]);

  useEffect(() => {
    const eventsService = EventsService.getInstance().getService();

    const joinWaitingQueueHandler = (data: WaitingQueueClient) => {
      setClientsOnQueue((prev) => [...prev, data]);
    };

    const leaveWaitingQueueHandler = (data: LeaveWaitingQueueInput) => {
      setClientsOnQueue((prev) =>
        prev.filter(
          (clientOnQueue) =>
            clientOnQueue.clientIdentifier !== data.clientIdentifier
        )
      );
    };

    const attendWaitingQueueHandler = (data: WaitingQueueClient) => {
      setClientsOnQueue((prev) =>
        prev.filter(
          (clientOnQueue) =>
            clientOnQueue.clientIdentifier !== data.clientIdentifier
        )
      );
    };

    eventsService.on('joinWaitingQueue', joinWaitingQueueHandler);
    eventsService.on('leaveWaitingQueue', leaveWaitingQueueHandler);
    eventsService.on('attendWaitingQueue', attendWaitingQueueHandler);

    return () => {
      eventsService.removeListener('joinWaitingQueue', joinWaitingQueueHandler);
      eventsService.removeListener(
        'leaveWaitingQueue',
        leaveWaitingQueueHandler
      );
      eventsService.removeListener(
        'attendWaitingQueue',
        attendWaitingQueueHandler
      );
    };
  }, []);

  return (
    <AppPageWrapper isLoading={false}>
      <TableV2
        columns={columns}
        data={tabulatedClientsOnQueue}
      />
      <View style={{ flex: 0.1, paddingHorizontal: 16, alignItems: 'center' }}>
        <Button
          mode='contained'
          disabled={isAttending}
          loading={isAttending}
          onPress={attendWaitingQueue}
        >
          Dar a vez
        </Button>
      </View>
    </AppPageWrapper>
  );
}
