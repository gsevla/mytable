import { useFocusEffect, useRouting } from 'expo-next-react-navigation';
import React, { useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useContextSelector } from 'use-context-selector';
import { AuthContext } from '../../context';
import { Headline, Subheading, Text } from 'react-native-paper';
import { SizedBox } from '../../../../components/SizedBox';
import { mask } from 'remask';

export function IdentificationDonePage() {
  const handleSetActiveStep = useContextSelector(
    AuthContext,
    (values) => values.handleSetActiveStep,
  );

  const userState = useContextSelector(
    AuthContext,
    (values) => values.userState,
  );

  useFocusEffect(
    useCallback(() => {
      handleSetActiveStep('IdentificationDonePage');
    }, [handleSetActiveStep]),
  );

  const router = useRouting();
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#eeeeee',
        paddingHorizontal: 24,
        justifyContent: 'space-between',
      }}
    >
      <Headline style={{ textAlign: 'center' }}>
        Olá,{'\n'}
        <Headline>{userState?.personalData?.name}</Headline>
      </Headline>
      <SizedBox h={16} />
      <Headline style={{ textAlign: 'center' }}>Verificamos que</Headline>
      <SizedBox h={16} />
      <Subheading style={{ textAlign: 'center' }}>
        Seu telefone é:{'\n'}
        <Text>{mask(userState?.personalData?.phone, ['(99) 99999-9999'])}</Text>
      </Subheading>
      <SizedBox h={8} />
      <Subheading style={{ textAlign: 'center' }}>
        Seu email é:{'\n'}
        <Text>{userState?.personalData?.email}</Text>
      </Subheading>
      <View>
        <SizedBox h={32} />
        <Button
          mode="text"
          onPress={() => {
            router.navigate({
              routeName: 'forgot-password',
              web: {
                path: 'auth/forgot-password',
              },
            });
          }}
        >
          Não possuo mais acesso
        </Button>
        <SizedBox h={24} />
        <Button
          mode="contained"
          onPress={() => {
            router.replace({
              routeName: 'authorization',
              web: {
                path: 'auth/authorization',
              },
              params: {
                shouldSendCode: true,
              },
            });
          }}
        >
          Avançar
        </Button>
      </View>
    </ScrollView>
  );
}
