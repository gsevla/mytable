import React, { useCallback, useState } from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { createContext, useContextSelector } from 'use-context-selector';
import { useRouting } from 'expo-next-react-navigation';
import { useFormik, FormikContextType } from 'formik';
import { Client, CreateClientInput } from '@mytable/domain';
import { unMask } from 'remask';
import { SizedBox } from '../../components/SizedBox';
import { AUTHENTICATION_STEPS } from './constants';
import { goBack } from '../../services/navigation';
import { RootContext } from '../Root/context';
import { yup } from '../../utils/yup';
import { useShowSnackBar } from '../Root/hooks/useShowSnackBar';
import { useStorageService } from '#hooks/storage';
import { STORAGE_KEYS } from '~/services/storage/keys';
import { useSignUpClient } from '#hooks/api/client/useSignUpClient';

export const AuthContext = createContext(
  {} as {
    handleSetActiveStep(_activeStep: keyof typeof AUTHENTICATION_STEPS): void;
    persistToken(data: string): void;
    persistClient(data: Client): void;
    formik: FormikContextType<CreateClientInput>;
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
  const storageService = useStorageService();

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
    await storageService.setData(STORAGE_KEYS.token, JSON.stringify(data), {
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

  const persistClient = useCallback(async (data: Client) => {
    await storageService.setData(STORAGE_KEYS.client, JSON.stringify(data));
    setClient(data);
    router.replace({
      routeName: 'identification-done',
      web: {
        path: 'auth/identification/done',
      },
    });
  }, []);

  const { mutate: signUpClient } = useSignUpClient({
    onSuccess: async (data) => {
      console.log('useSignUpClient data', data);
      await persistClient(data?.data);
    },
    onError: (error) => {
      console.log('useSignUpClient error', error);
      if (error?.status === 409) {
        showSnackBar(
          error?.error?.message ??
            'Ops! Um erro inesperado aconteceu, tente novamente mais tarde.'
        );
      } else {
        showSnackBar(
          'Ops! Um erro inesperado aconteceu, tente novamente mais tarde.'
        );
      }
    },
  });

  function onFormSubmit(values: CreateClientInput) {
    const { cpf: _cpf, phone: _phone, ...restValues } = values;
    const unMaskedValues = {
      ...restValues,
      cpf: unMask(_cpf) as string,
      phone: unMask(_phone) as string,
    };
    signUpClient(unMaskedValues);
  }

  const formik = useFormik<CreateClientInput>({
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
