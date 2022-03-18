import React, { useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { useContextSelector } from 'use-context-selector';
import { AuthContext } from '../../context';
import {
  Button,
  Caption,
  Title,
  Headline,
  Subheading,
} from 'react-native-paper';
import { SizedBox } from '../../../../components/SizedBox';
import { useFocusEffect } from 'expo-next-react-navigation';
import { RootContext } from '../../../Root/context';

export function ForgotPasswordPage() {
  const handleSetActiveStep = useContextSelector(
    AuthContext,
    (values) => values.handleSetActiveStep,
  );
  useFocusEffect(
    useCallback(() => {
      handleSetActiveStep('ForgotPasswordPage');
    }, [handleSetActiveStep]),
  );

  const client = useContextSelector(RootContext, (values) => values.client);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#eeeeee',
        paddingHorizontal: 24,
        justifyContent: 'space-between',
      }}
    >
      <Title>
        {client?.name}, infelizmente não podemos recuperar o seu acesso por
        aqui.
      </Title>
      <SizedBox h={16} />
      <Headline>Mas não fique triste!</Headline>
      <SizedBox h={16} />
      <Subheading>
        <Title>Siga os passos a seguir:</Title>
        {'\n'}
        <Subheading>1. Entre em contato conosco pelo link abaixo</Subheading>
        {'\n'}
        <Subheading>2. Informe seu novo telefone e email</Subheading>
        {'\n'}
        <Subheading>
          3. Detalhe o problema se necessário e envie o email
        </Subheading>
      </Subheading>
      <SizedBox h={16} />
      <Caption style={{ fontWeight: 'bold', textAlign: 'center' }}>
        Observação: é provável que nós solicitemos algumas informações pessoais.
      </Caption>
      <View>
        <SizedBox h={32} />
        <Button mode="text" onPress={() => {}}>
          Fale conosco
        </Button>
      </View>
    </ScrollView>
  );
}
