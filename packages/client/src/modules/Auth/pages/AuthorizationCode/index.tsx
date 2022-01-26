import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SizedBox } from '../../../../components/SizedBox';

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
      <SizedBox h={32} />
        <TextInput
          label="Código"
        style={{ alignSelf: 'stretch' }}
        value={code}
          onChangeText={(text) => setCode(text)}
        />
      <Button
        mode="contained"
        onPress={() => {
        }}
      >
        Confirmar
      </Button>
    </View>
  );
}
