import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Headline, Paragraph, Portal } from 'react-native-paper';
import { SizedBox } from '../../../../../../components/SizedBox';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IdentificationStackParamList } from '../../navigation/types';
import { DialogWithConfirmation } from '../../../../../../components/Dialog';

type Props = NativeStackScreenProps<IdentificationStackParamList, 'Waiting'>;

export function AppIdentificationWaitingPage({ navigation }: Props) {
  const [isCancelDialogOpened, setIsCancelDialogOpened] = useState(false);

  function onOpenCancelDialog() {
    setIsCancelDialogOpened(true);
  }

  function onCloseCancelDialog() {
    setIsCancelDialogOpened(false);
  }

  function onConfirmCancelDialog() {
    setIsCancelDialogOpened(false);
    navigation.navigate('qr', { forceNavigate: true });
  }

  return (
    <>
      <View style={styles.container}>
        <View>
          <Headline style={styles.headline}>
            Fulano, você está {'\n'}na{' '}
            <Headline style={styles.headlineBold}>X</Headline> posição
          </Headline>
          <SizedBox />
          <Headline
            onPress={() => {
              navigation.navigate('your-turn', { forceNavigate: true });
            }}
            style={styles.headline}
          >
            <Headline style={styles.headlineBold}>Y</Headline> pessoas {'\n'}
            estão na sua frente
          </Headline>
        </View>

        {/* TODO */}
        {/* Componente de relógio */}
        <View style={styles.imageSimulation} />

        <Button
          mode='contained'
          onPress={onOpenCancelDialog}
        >
          Sair da fila de espera
        </Button>
      </View>
      <DialogWithConfirmation
        visible={isCancelDialogOpened}
        message='Você realmente deseja sair da fila de espera?'
        confirmDialogText='Sim'
        closeDialogText='Não'
        onCloseDialog={onCloseCancelDialog}
        onConfirmDialog={onConfirmCancelDialog}
      />
    </>
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
  headlineBold: {
    fontWeight: 'bold',
  },
  imageSimulation: {
    width: 200,
    height: 200,
    backgroundColor: '#aaa',
  },
});
