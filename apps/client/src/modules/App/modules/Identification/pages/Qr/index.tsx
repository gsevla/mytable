import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Headline, Caption } from 'react-native-paper';
import { SizedBox } from '../../../../../../components/SizedBox';

export function AppIdentificatioQrPage() {
  return (
    <View style={styles.container}>
      <Headline style={styles.headline}>
        Esse é o seu código de {'\n'}identificação.
      </Headline>
      <SizedBox />
      <Headline style={styles.headline}>
        Exiba-o na recepção caso {'\n'}queira entrar na fila de {'\n'}espera.
      </Headline>

      <SizedBox />

      <View style={styles.imageSimulation} />

      <Caption>Código</Caption>
      <Caption style={styles.captionBold}>XXXXXXXXX</Caption>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headline: {
    textAlign: 'center',
  },
  imageSimulation: {
    width: 200,
    height: 200,
    backgroundColor: '#aaa',
  },
  captionBold: {
    fontWeight: 'bold',
  },
});
