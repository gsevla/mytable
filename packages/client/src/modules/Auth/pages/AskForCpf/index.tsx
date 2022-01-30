import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { AuthContext } from '../../context';
import { useFocusEffect, useRouting } from 'expo-next-react-navigation';
import { SizedBox } from '../../../../components/SizedBox';
import { useContextSelector } from 'use-context-selector';
import { mask } from 'remask';

export function AskForCpfPage() {
  const handleSetActiveStep = useContextSelector(
    AuthContext,
    (values) => values.handleSetActiveStep,
  );
  const setUserCpf = useContextSelector(
    AuthContext,
    (values) => values.setUserCpf,
  );
  const userState = useContextSelector(
    AuthContext,
    (values) => values.userState,
  );

  useFocusEffect(
    useCallback(() => {
      handleSetActiveStep('AskForCpfPage');
    }, [handleSetActiveStep]),
  );

  const router = useRouting();

  const [cpf, setCpf] = React.useState(mask(userState.cpf, ['999.999.999-99']));

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#eeeeee',
        paddingHorizontal: 24,
      }}
    >
      <SizedBox h={0} />
      <TextInput
        label="CPF"
        style={{ alignSelf: 'stretch' }}
        value={mask(cpf, ['999.999.999-99'])}
        onChangeText={(text) => setCpf(text)}
      />
      <Button
        mode="contained"
        onPress={() => {
          setUserCpf(cpf);
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
