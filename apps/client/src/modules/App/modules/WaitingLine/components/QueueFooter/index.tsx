import { Client } from '@mytable/domain';
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useLeaveWaitingQueue } from '#hooks/api/waitingQueue/useLeaveWaitingQueue';
import { useJoinWaitingQueue } from '#hooks/api/waitingQueue/useJoinWaitingQueue';

export type QueueFooterProps = {
  client?: Client;
  isOnQueue: boolean;
};

export function QueueFooter({ client, isOnQueue }: QueueFooterProps) {
  const enabled = !!client;

  const { mutate: joinWaitingQueue, isLoading: isJoinWaitingQueueLoading } =
    useJoinWaitingQueue();
  const { mutate: leaveWaitingQueue, isLoading: isLeaveWaitingQueueLoading } =
    useLeaveWaitingQueue();

  return (
    <View>
      {!isOnQueue ? (
        <Button
          mode='contained'
          disabled={!enabled || isJoinWaitingQueueLoading}
          loading={isJoinWaitingQueueLoading}
          onPress={() => {
            joinWaitingQueue({
              clientIdentifier: client?.identifier as string,
              name: `${client?.name} ${client?.surname}`,
              tableSize: 2,
            });
          }}
        >
          Entrar na fila
        </Button>
      ) : (
        <Button
          mode='contained'
          color='#ff4d4d'
          labelStyle={{
            color: '#fff',
          }}
          disabled={!enabled || isLeaveWaitingQueueLoading}
          loading={isLeaveWaitingQueueLoading}
          onPress={() => {
            leaveWaitingQueue({
              clientIdentifier: client?.identifier as string,
            });
          }}
        >
          Sair da fila
        </Button>
      )}
    </View>
  );
}
