import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Headline } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IdentificationStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<IdentificationStackParamList, 'YourTurn'>;

export function AppIdentificationYourTurnPage({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Headline
        onPress={() => {
          navigation.navigate('loose-your-turn', { forceNavigate: true });
        }}
        style={styles.headline}
      >
        Sua vez chegou, {'\n'}dirija-se à recepção!
      </Headline>

      {/* TODO */}
      {/* Componente de congratulações */}
      <View style={styles.imageSimulation} />

      <Button
        mode='contained'
        onPress={() => {
          navigation.navigate('qr', { forceNavigate: true });
        }}
      >
        Confirmar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
  imageSimulation: {
    width: 200,
    height: 200,
    backgroundColor: '#aaa',
  },
  headline: {
    textAlign: 'center',
  },
});
