import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Headline } from 'react-native-paper';
import { SizedBox } from '../../../../../../components/SizedBox';

export function AppIdentificationWaitingPage() {
  return (
    <View style={styles.container}>
      <View>
        <Headline>
          Fulano, você está {'\n'}na{' '}
          <Headline style={styles.headlineBold}>X</Headline> posição
        </Headline>
        <SizedBox />
        <Headline>
          <Headline style={styles.headlineBold}>Y</Headline> pessoas {'\n'}estão
          na sua frente
        </Headline>
      </View>

      {/* TODO */}
      {/* Componente de relógio */}
      <View style={styles.imageSimulation} />

      <Button
        mode='contained'
        onPress={() => {}}
      >
        Sair da fila de espera
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
  headlineBold: {
    fontWeight: 'bold',
  },
  imageSimulation: {
    width: 200,
    height: 200,
    backgroundColor: '#aaa',
  },
});
