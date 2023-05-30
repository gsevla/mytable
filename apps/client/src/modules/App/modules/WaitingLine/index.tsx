import {
  Client,
  LeaveWaitingQueueInput,
  WaitingQueueClient,
} from '@mytable/domain';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SizedBox } from '@mytable/components';
import { EventsService } from '~/services/events';
import { ClientRow } from './components/ClientRow';
import { QueueEmpty } from './components/QueueEmpty';
import { QueueFooter } from './components/QueueFooter';
import { useWaitingQueue } from '#hooks/api/waitingQueue/useWaitingQueue';
import { useSnackbar } from '#hooks/useSnackbar';
import { useAuthenticatedClient } from '#hooks/storage/useAuthenticatedClient';

export function WaitingLine() {
  const snackbar = useSnackbar();

  const client = useAuthenticatedClient();
  const [clientsOnQueue, setClientsOnQueue] = useState<
    Array<WaitingQueueClient>
  >([]);

  useWaitingQueue({
    onSuccess(data) {
      setClientsOnQueue(data?.data ?? []);
    },
  });

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
      const wasClientAttended = data.clientIdentifier === client?.identifier;
      setClientsOnQueue((prev) =>
        prev.filter(
          (clientOnQueue) =>
            clientOnQueue.clientIdentifier !== data.clientIdentifier
        )
      );
      if (wasClientAttended) {
        snackbar.showSnackbar(
          'Sua vez chegou! Dirija-se ao balção durante os próximos 5 minutos.'
        );
      }
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
  }, [snackbar, client]);

  const isClientOnQueue = useMemo(
    () =>
      !!clientsOnQueue.find(
        (clientOnQueue) => clientOnQueue.clientIdentifier === client?.identifier
      ),
    [client, clientsOnQueue]
  );

  return (
    <View style={{ flexGrow: 1 }}>
      <FlatList<WaitingQueueClient>
        data={clientsOnQueue}
        renderItem={({ item, index }) => (
          <ClientRow
            waitingQueueClient={item}
            position={(index + 1).toString()}
            loggedClientIdentifier={client?.identifier as string}
            name={item.name}
          />
        )}
        keyExtractor={(item) => item.clientIdentifier}
        style={{ flex: 0.9 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 24,
          paddingHorizontal: 16,
        }}
        ItemSeparatorComponent={() => <SizedBox h={16} />}
        ListEmptyComponent={QueueEmpty}
      />
      <View style={{ flex: 0.1, paddingHorizontal: 16 }}>
        <QueueFooter
          client={client}
          isOnQueue={isClientOnQueue}
        />
      </View>
    </View>
  );
}
