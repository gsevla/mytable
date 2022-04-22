import React, { useEffect, useRef } from 'react';
import {
  Portal,
  Dialog as RNPDialog,
  Paragraph,
  Button,
} from 'react-native-paper';
import { SizedBox } from '../SizedBox';

interface Props {
  visible: boolean;
  title?: string;
  message: string;
  onOpenDialog?(): void;
  closeDialogText?: string;
  onCloseDialog?(): void;
  confirmDialogText?: string;
  onConfirmDialog?(): void;
}

export function DialogWithConfirmation({
  visible,
  title = 'Alerta',
  message,
  onOpenDialog,
  closeDialogText = 'Cancelar',
  onCloseDialog,
  confirmDialogText = 'Confirmar',
  onConfirmDialog,
}: Props) {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      onOpenDialog?.();
    }
  }, []);

  function _onCloseDialog() {
    onCloseDialog?.();
  }

  function _onConfirmDialog() {
    onConfirmDialog?.();
  }

  return (
    <Portal>
      <RNPDialog
        visible={visible}
        onDismiss={_onCloseDialog}
      >
        <RNPDialog.Title>{title}</RNPDialog.Title>
        <RNPDialog.Content>
          <Paragraph>{message}</Paragraph>
        </RNPDialog.Content>
        <RNPDialog.Actions>
          <Button
            mode='contained'
            onPress={_onConfirmDialog}
          >
            {confirmDialogText}
          </Button>
          <SizedBox />
          <Button
            mode='outlined'
            onPress={_onCloseDialog}
          >
            {closeDialogText}
          </Button>
        </RNPDialog.Actions>
      </RNPDialog>
    </Portal>
  );
}
