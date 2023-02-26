import React, { useEffect, useRef } from 'react';
import {
  Portal,
  Dialog as RNPDialog,
  Paragraph,
  Button,
} from 'react-native-paper';

export type DialogProps = {
  visible: boolean;
  title?: string;
  message: string;
  onOpenDialog?(): void;
  closeDialogText?: string;
  onCloseDialog?(): void;
};

export function Dialog({
  visible,
  title = 'Alerta',
  message,
  onOpenDialog = () => {},
  closeDialogText = 'Ok',
  onCloseDialog = () => {},
}: DialogProps) {
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
            mode='text'
            onPress={onCloseDialog}
          >
            {closeDialogText}
          </Button>
        </RNPDialog.Actions>
      </RNPDialog>
    </Portal>
  );
}
