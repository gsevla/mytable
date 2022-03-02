import React, { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { ActivityIndicator, Title } from 'react-native-paper';

function LoadingScreen() {
  useEffect(() => {
    StatusBar.setHidden(true);

    return () => {
      StatusBar.setHidden(false);
    };
  }, []);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
      <Title>Carregando</Title>
    </View>
  );
}

export default LoadingScreen;
