import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Title } from 'react-native-paper';

function LoadingScreen() {
  return (
    <View
      style={{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee',
      }}
    >
      <ActivityIndicator size='large' />
      <Title>Carregando</Title>
    </View>
  );
}

export default LoadingScreen;
