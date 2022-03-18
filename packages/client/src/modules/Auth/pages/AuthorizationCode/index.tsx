import React, { useCallback, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useContextSelector } from 'use-context-selector';
import { AuthContext } from '../../context';
import { Caption, Headline, Subheading } from 'react-native-paper';
import { useFocusEffect, useRouting } from 'expo-next-react-navigation';
import { ApiService } from '../../../../services';
import { RootContext } from '../../../Root/context';
import { useShowSnackBar } from '../../../Root/hooks/useShowSnackBar';

export function AuthorizationCodePage({ route }) {
  const { params } = route;
  const router = useRouting();
  const showSnackBar = useShowSnackBar();

  const handleSetActiveStep = useContextSelector(
    AuthContext,
    (values) => values.handleSetActiveStep,
  );
  useFocusEffect(
    useCallback(() => {
      handleSetActiveStep('AuthorizationCodePage');
    }, [handleSetActiveStep]),
  );

  const client = useContextSelector(RootContext, (values) => values.client);

  const persistToken = useContextSelector(
    AuthContext,
    (values) => values.persistToken,
  );

  useEffect(() => {
    if (params?.token) {
      persistToken(params.token);
    }
  }, [params?.token]);

  const { mutate: signInClient } =
    ApiService.auth.authMutations.useQuerySignInClient();

  useEffect(() => {
    if (client) {
      signInClient(client.cpf, {
        onError: (error) => {
          if (error.response?.status === 401) {
            showSnackBar(
              error.response?.data?.message ??
                'Ops! Um erro inesperado aconteceu, tente novamente mais tarde.',
            );
          } else {
            showSnackBar(
              'Ops! Um erro inesperado aconteceu, tente novamente mais tarde.',
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
