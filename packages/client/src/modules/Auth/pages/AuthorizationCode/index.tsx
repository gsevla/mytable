import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { AuthContext } from '../../context';

export function AuthorizationCodePage() {
  // const authContext = useContext(AuthContext);

  const [code, setCode] = useState('');
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TextInput
          label="Código"
          value={code}
          onChangeText={(text) => setCode(text)}
        />
      </View>
      <Button
        mode="contained"
        onPress={() => {
          // authContext.setStep(3);
        }}
      >
        Confirmar
      </Button>
    </View>
  );
}
