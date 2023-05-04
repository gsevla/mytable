import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Headline, Caption } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Client } from '@mytable/domain';
import QRCode from 'react-qr-code';
import { SizedBox } from '../../../../../../components/SizedBox';
import { IdentificationStackParamList } from '../../navigation/types';
import { useStorageService } from '#hooks/storage/useStorageService';
import { useAuthenticatedClient } from '#hooks/storage/useAuthenticatedClient';

type Props = NativeStackScreenProps<IdentificationStackParamList, 'Qr'>;

export function AppIdentificationQrPage(props: Props) {
  const client = useAuthenticatedClient();

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
        {client?.identifier ? (
          <QRCode
            size={200}
            value={client?.identifier}
          />
        ) : (
          <View style={styles.imageSimulation} />
        )}
        <Caption>ID</Caption>
        <Caption style={styles.captionBold}>{client?.identifier}</Caption>
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
