import React, { useCallback, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useContextSelector } from 'use-context-selector';
import { AuthContext } from '../../context';
import { Caption, Headline, Subheading } from 'react-native-paper';
import { useFocusEffect, useRouting } from 'expo-next-react-navigation';
import { ApiService } from '../../../../services';
import { RootContext } from '../../../Root/context';
import { useShowSnackBar } from '../../../Root/hooks/useShowSnackBar';

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
    if (token) {
      persistToken(token);
    }
  }, [token]);

  const { mutate: signInClient } =
    ApiService.auth.authMutations.useQuerySignInClient();

  useEffect(() => {
    if (client && (shouldSendCode === 'true' || shouldSendCode === true)) {
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
        Verifique sua caixa de entrada para prosseguir com a autentica????o.
      </Subheading>
      <Caption style={{ fontWeight: 'bold', textAlign: 'center' }}>
        Observa????o: caso o email n??o chegue, apenas reinicie a aplica????o e
        avance novamente.
      </Caption>
    </ScrollView>
  );
}
