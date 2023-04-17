import { AppPageWrapper } from 'components/AppPageWrapper';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function AppReservationOrderEditPage() {
  return (
    <AppPageWrapper isLoading={false}>
      <View>
        <Text>Edição de ordem de reserva</Text>
      </View>
    </AppPageWrapper>
  );
}
