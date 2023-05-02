import {
  Client,
  LeaveWaitingQueueInput,
  WaitingQueueClient,
} from '@mytable/domain';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SizedBox } from '@mytable/components';
import { useStorageService } from '#hooks/storage/useStorageService';
import { EventsService } from '~/services/events';
import { STORAGE_KEYS } from '~/services/storage/keys';
import { ClientRow } from './components/ClientRow';
import { QueueEmpty } from './components/QueueEmpty';
import { QueueFooter } from './components/QueueFooter';
import { useWaitingQueue } from '#hooks/api/waitingQueue/useWaitingQueue';
import { useSnackbar } from '#hooks/useSnackbar';

export function WaitingLine() {
  const storageService = useStorageService();
  const snackbar = useSnackbar();

  const [client, setClient] = useState<Client | undefined>();
  const [clientsOnQueue, setClientsOnQueue] = useState<
    Array<WaitingQueueClient>
  >([]);

  useWaitingQueue({
    onSuccess(data) {
      setClientsOnQueue(data?.data ?? []);
    },
  });

  async function retrieveClient() {
    const innerClient = await storageService.getData<Client>(
      STORAGE_KEYS.client
    );

    if (innerClient) {
      setClient(innerClient);
    }
  }

  useEffect(() => {
    retrieveClient();
  }, []);

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
