import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Headline, Caption } from 'react-native-paper';
import { SizedBox } from '../../../../../../components/SizedBox';

export function AppIdentificationQrPage() {
  return (
    <View style={styles.container}>
      <View>
        <Headline style={styles.headline}>
          Esse é o seu código de {'\n'}identificação.
        </Headline>
        <SizedBox />
        <Headline style={styles.headline}>
          Exiba-o na recepção caso {'\n'}queira entrar na fila de {'\n'}espera.
        </Headline>
      </View>

      <View style={styles.qrImageContainer}>
        <View style={styles.imageSimulation} />
        <Caption>ID</Caption>
        <Caption style={styles.captionBold}>XXXXXXXXX</Caption>
      </View>

      <SizedBox />
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
  qrImageContainer: {
    alignItems: 'center',
  },
});
