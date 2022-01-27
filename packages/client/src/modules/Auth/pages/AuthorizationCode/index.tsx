import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useContextSelector } from 'use-context-selector';
import { SizedBox } from '../../../../components/SizedBox';
import { AuthContext } from '../../context';

export function AuthorizationCodePage() {
  const handleSetActiveStep = useContextSelector(
    AuthContext,
    (values) => values.handleSetActiveStep,
  );
  useEffect(() => {
    handleSetActiveStep('AuthorizationCodePage');
  }, []);

  const [code, setCode] = useState('');
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        backgroundColor: '#eeeeee',
      }}
    >
      <SizedBox h={32} />
      <TextInput
        label="Código"
        style={{ alignSelf: 'stretch' }}
        value={code}
        onChangeText={(text) => setCode(text)}
      />
      <Button mode="contained" onPress={() => {}}>
        Confirmar
      </Button>
    </View>
  );
}
