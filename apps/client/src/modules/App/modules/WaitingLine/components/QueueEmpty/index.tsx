import { Text } from '@mytable/components';
import React from 'react';
import { View } from 'react-native';

export function QueueEmpty() {
  return (
    <View style={{ flex: 1 }}>
      <Text size='lg'> Não há pessoas na fila</Text>
    </View>
  );
}
