import React, { useCallback, useState } from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { createContext, useContextSelector } from 'use-context-selector';
import { useRouting } from 'expo-next-react-navigation';
import { useFormik, FormikContextType } from 'formik';
import { ClientDto } from '@mytable/dtos';
import { unMask } from 'remask';
import { SizedBox } from '../../components/SizedBox';
import { AUTHENTICATION_STEPS } from './constants';
import { goBack } from '../../services/navigation';
import { ApiService, StorageService } from '../../services';
import { RootContext } from '../Root/context';
import { yup } from '../../utils/yup';
import { useShowSnackBar } from '../Root/hooks/useShowSnackBar';

export const AuthContext = createContext(
  {} as {
    handleSetActiveStep(_activeStep: keyof typeof AUTHENTICATION_STEPS): void;
    persistToken(data: string): void;
    persistClient(data: ClientDto.IClient): void;
    formik: FormikContextType<ClientDto.ICreateClient>;
  }
);

const yupValidationSchema = yup.object().shape({
  cpf: yup.string().isCPFValid().required().label('CPF'),
  name: yup.string().required().label('Nome'),
  surname: yup.string().required().label('Sobrenome'),
  phone: yup.string().required().label('Telefone'),
  email: yup.string().required().email().label('Email'),
});

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouting();
  const showSnackBar = useShowSnackBar();

  const setToken = useContextSelector(RootContext, (values) => values.setToken);
  const setClient = useContextSelector(
    RootContext,
    (values) => values.setClient
  );

  const [activeStep, setActiveStep] = useState<AUTHENTICATION_STEPS>(
    AUTHENTICATION_STEPS.AskForCpfPage
  );
  const handleSetActiveStep = useCallback(
    (_activeStep: keyof typeof AUTHENTICATION_STEPS) => {
      setActiveStep(AUTHENTICATION_STEPS[_activeStep]);
    },
    []
  );

  const persistToken = useCallback(async (data: string) => {
    await StorageService.setData({
      key: 'token',
      value: JSON.stringify(data),
      options: {
        path: '/',
      },
    });
    setToken(data);
    if (Platform.OS === 'web') {
      router.replace({
        routeName: 'app',
        web: {
          path: 'app',
        },
      });
    }
  }, []);

  const persistClient = useCallback(async (data: ClientDto.IClient) => {
    await StorageService.setData({
      key: 'client',
      value: JSON.stringify(data),
    });
    setClient(data);
    router.replace({
      routeName: 'identification-done',
      web: {
        path: 'auth/identification/done',
      },
    });
  }, []);

  const { mutate: signUpClient } =
    ApiService.auth.authMutations.useQuerySignUpClient();

  function onFormSubmit(values: ClientDto.ICreateClient) {
    const { cpf: _cpf, phone: _phone, ...restValues } = values;
    const unMaskedValues = {
      ...restValues,
      cpf: unMask(_cpf, ['999.999.999-99']) as string,
      phone: unMask(_phone, ['(99) 99999-9999']) as string,
    };
    signUpClient(unMaskedValues, {
      onSuccess: persistClient,
      onError: (error) => {
        if (error.response?.status === 409) {
          showSnackBar(
            error.response?.data?.message ??
              'Ops! Um erro inesperado aconteceu, tente novamente mais tarde.'
          );
        } else {
          showSnackBar(
            'Ops! Um erro inesperado aconteceu, tente novamente mais tarde.'
          );
        }
      },
    });
  }

  const formik = useFormik<ClientDto.ICreateClient>({
    validationSchema: yupValidationSchema,
    initialValues: {
      cpf: '',
      name: '',
      surname: '',
      phone: '',
      email: '',
    },
    onSubmit: onFormSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
  });

  if (router.pathname === '/' || router.pathname === '/app') {
    return children;
  }

  return (
    <AuthContext.Provider
      value={{
        handleSetActiveStep,
        persistToken,
        persistClient,
        formik,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: '#eeeeee',
          paddingHorizontal: 16,
          paddingVertical: 24,
        }}
      >
        <View style={{ height: 72, transform: [{ translateX: -16 }] }}>
          {activeStep === AUTHENTICATION_STEPS.AskForCpfPage ||
          activeStep === AUTHENTICATION_STEPS.AuthorizationCodePage ||
          activeStep === AUTHENTICATION_STEPS.IdentificationDonePage ? null : (
            <FAB
              style={styles.fab}
              small
              icon='arrow-left'
              onPress={() => {
                goBack();
              }}
            />
          )}
        </View>
        <Image
          source={require('../../../assets/logoDefault.png')}
          resizeMode='contain'
          style={{
            width: '75%',
            height: '25%',
            alignSelf: 'center',
          }}
        />
        <SizedBox h={32} />
        {children}
      </View>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 16,
  },
});
