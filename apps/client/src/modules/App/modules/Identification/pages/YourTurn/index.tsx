import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Headline } from 'react-native-paper';

export function AppIdentificationYourTurnPage() {
  return (
    <View style={styles.container}>
      <Headline style={styles.headlingCentered}>
        Sua vez chegou, {'\n'}dirija-se à recepção!
      </Headline>

      {/* TODO */}
      {/* Componente de congratulações */}
      <View style={styles.imageSimulation} />

      <Button
        mode='contained'
        onPress={() => {}}
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
  headlingCentered: {
    textAlign: 'center',
  },
});
