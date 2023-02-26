import React, { useEffect, useRef } from 'react';
import {
  Portal,
  Dialog as RNPDialog,
  Paragraph,
  Button,
} from 'react-native-paper';
import { SizedBox } from '../SizedBox';

export type DialogWithConfirmationProps = {
  visible: boolean;
  title?: string;
  message: string;
  onOpenDialog?(): void;
  closeDialogText?: string;
  onCloseDialog?(): void;
  confirmDialogText?: string;
  onConfirmDialog?(): void;
};

export function DialogWithConfirmation({
  visible,
  title = 'Alerta',
  message,
  onOpenDialog = () => {},
  closeDialogText = 'Cancelar',
  onCloseDialog = () => {},
  confirmDialogText = 'Confirmar',
  onConfirmDialog = () => {},
}: DialogWithConfirmationProps) {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      onOpenDialog?.();
    }
  }, []);

  return (
    <Portal>
      <RNPDialog
        visible={visible}
        onDismiss={onCloseDialog}
      >
        <RNPDialog.Title>{title}</RNPDialog.Title>
        <RNPDialog.Content>
          <Paragraph>{message}</Paragraph>
        </RNPDialog.Content>
        <RNPDialog.Actions>
          <Button
            mode='contained'
            onPress={onConfirmDialog}
          >
            {confirmDialogText}
          </Button>
          <SizedBox />
          <Button
            mode='outlined'
            onPress={onCloseDialog}
          >
            {closeDialogText}
          </Button>
        </RNPDialog.Actions>
      </RNPDialog>
    </Portal>
  );
}
