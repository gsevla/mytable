import { Paper, SizedBox, Text } from '@mytable/components';
import { WaitingQueueClient } from '@mytable/domain';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

export type ClientRowProps = {
  name: string;
  loggedClientIdentifier: string;
  waitingQueueClient: WaitingQueueClient;
  position: string;
};

export function ClientRow({
  name,
  loggedClientIdentifier,
  waitingQueueClient,
  position,
}: ClientRowProps) {
  const theme = useTheme();

  const shouldColorize =
    loggedClientIdentifier === waitingQueueClient.clientIdentifier;

  const shouldColorizeTheme = shouldColorize
    ? {
        backgroundColor: theme.colors.accent,
      }
    : {};

  const onQueueSince = useMemo(() => {
    const since = new Date(parseInt(waitingQueueClient.createdAt, 10));

    return `Entrou às ${since.getHours().toString().padStart(2, '0')}:${since
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  }, [waitingQueueClient.createdAt]);

  return (
    <Paper
      style={[
        {
          padding: 8,
          borderRadius: 4,
        },
        shouldColorizeTheme,
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text
          size='xlg'
          weight='bold'
        >
          {position}.
        </Text>
        <SizedBox w={8} />
        <View>
          <View>
            <Text size='lg'>{onQueueSince}</Text>
          </View>
          <View>
            <Text size='lg'>{name}</Text>
          </View>
        </View>
      </View>
    </Paper>
  );
}
