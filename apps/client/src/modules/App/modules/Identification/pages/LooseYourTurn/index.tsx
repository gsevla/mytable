import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Headline } from 'react-native-paper';

export function AppIdentificationLooseYourTurnPage() {
  return (
    <View style={styles.container}>
      <Headline>Ops! Parece que {'\n'}você perdeu a vez.</Headline>

      {/* TODO */}
      {/* Componente de sinto muito */}
      <View style={styles.imageSimulation} />

      <View>
        <Headline>Sentimos muito!</Headline>
        <Headline>
          Você pode entrar {'\n'}novamente na {'\n'}fila caso deseje.
        </Headline>
      </View>

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
});
