import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { AuthContext } from '../../context';
import { useFocusEffect, useRouting } from 'expo-next-react-navigation';
import { SizedBox } from '../../../../components/SizedBox';
import { useContextSelector } from 'use-context-selector';

export function AskForCpfPage() {
  const handleSetActiveStep = useContextSelector(
    AuthContext,
    (values) => values.handleSetActiveStep,
  );

  useFocusEffect(
    useCallback(() => {
      handleSetActiveStep('AskForCpfPage');
    }, [handleSetActiveStep]),
  );

  const router = useRouting();

  const [text, setText] = React.useState('');

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#eeeeee',
        paddingHorizontal: 24,
      }}
    >
      <TextInput
        label="CPF"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <SizedBox h={48} />
      <Button
        mode="contained"
        onPress={() => {
          router.navigate({
            routeName: 'auth/identification',
          });
        }}
      >
        Avançar
      </Button>
    </View>
  );
}
