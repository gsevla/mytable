import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';

interface Props {
  time: string;
  onPress(time: string): void;
}

export function AppReservationReserveTimeCardComponent({
  time,
  onPress,
}: Props) {
  const innerOnPress = () => {
    onPress(time);
  };

  return (
    <Button
      mode='outlined'
      onPress={innerOnPress}
      contentStyle={{
        width: 96,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {time}
    </Button>
  );
}
