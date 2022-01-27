import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useContextSelector } from 'use-context-selector';
import { AuthContext } from '../../context';

export function ForgotPasswordPage() {
  const handleSetActiveStep = useContextSelector(
    AuthContext,
    (values) => values.handleSetActiveStep,
  );
  useEffect(() => {
    handleSetActiveStep('ForgotPasswordPage');
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#eeeeee',
        paddingHorizontal: 24,
        justifyContent: 'space-between',
      }}
    >
      <Text>ForgotPassword page</Text>
      <Button mode="text" onPress={() => {}}>
        Fale conosco
      </Button>
    </View>
  );
}
