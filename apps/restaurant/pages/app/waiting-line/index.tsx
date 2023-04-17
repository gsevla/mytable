import { AppPageWrapper } from 'components/AppPageWrapper';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function AppWaitingLinePage() {
  return (
    <AppPageWrapper isLoading={false}>
      <View>
        <Text>Waiting Line screen</Text>
      </View>
    </AppPageWrapper>
  );
}
