import React, { useCallback, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useContextSelector } from 'use-context-selector';
import { Caption, Headline, Subheading } from 'react-native-paper';
import { useFocusEffect, useRouting } from 'expo-next-react-navigation';
import { AuthContext } from '../../context';
import { RootContext } from '../../../Root/context';
import { useShowSnackBar } from '../../../Root/hooks/useShowSnackBar';
import { useSignInClient } from '#hooks/api/client/useSignInClient';

export function AuthorizationCodePage() {
  const router = useRouting();
  const showSnackBar = useShowSnackBar();

  const shouldSendCode = router.getParam('shouldSendCode') as
    | string
    | boolean
    | undefined;
  const token = router.getParam('token') as string | undefined;

  const handleSetActiveStep = useContextSelector(
    AuthContext,
    (values) => values.handleSetActiveStep
  );
  useFocusEffect(
    useCallback(() => {
      handleSetActiveStep('AuthorizationCodePage');
    }, [handleSetActiveStep])
  );

  const client = useContextSelector(RootContext, (values) => values.client);

  const persistToken = useContextSelector(
    AuthContext,
    (values) => values.persistToken
  );

  useEffect(() => {
    if (token) {
      persistToken(token);
    }
  }, [token]);

  const { mutate: signInClient } = useSignInClient({
    onError: (error) => {
      console.log('useSignInClient error', error);
      if (error?.status === 401) {
        showSnackBar(
          error?.error?.message ??
            'Ops! Um erro inesperado aconteceu, tente novamente mais tarde.'
        );
      } else {
        showSnackBar(
          'Ops! Um erro inesperado aconteceu, tente novamente mais tarde.'
        );
      }
      router.replace({
        routeName: 'identification-done',
        web: {
          path: 'auth/identification/done',
        },
      });
    },
  });

  useEffect(() => {
    if (client && (shouldSendCode === 'true' || shouldSendCode === true)) {
      signInClient(client.cpf);
    }
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        backgroundColor: '#eeeeee',
      }}
    >
      <Headline>Email enviado!</Headline>
      <Subheading>
        Verifique sua caixa de entrada para prosseguir com a autenticação.
      </Subheading>
      <Caption style={{ fontWeight: 'bold', textAlign: 'center' }}>
        Observação: caso o email não chegue, apenas reinicie a aplicação e
        avance novamente.
      </Caption>
    </ScrollView>
  );
}
