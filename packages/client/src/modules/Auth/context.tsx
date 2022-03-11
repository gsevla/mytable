import React, { useCallback, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { SizedBox } from '../../components/SizedBox';
import { AUTHENTICATION_STEPS } from './constants';
import { createContext, useContextSelector } from 'use-context-selector';
import { goBackService } from '../../services/navigation';
import { ApiService, StorageService } from '../../services';
import { useRouting } from 'expo-next-react-navigation';
import { RootContext } from '../Root/context';
import { useFormik, FormikContextType } from 'formik';
import { yup } from '../../utils/yup';
import { ClientDto } from '@mytable/dtos';
import { useShowSnackBar } from '../Root/hooks/useShowSnackBar';
import { unMask } from 'remask';

export const AuthContext = createContext(
  {} as {
    handleSetActiveStep(_activeStep: keyof typeof AUTHENTICATION_STEPS): void;
    persistUserToken(userToken: string): void;
    formik: FormikContextType<ClientDto.ICreateClient>;
  },
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
  const showSnackBar = useShowSnackBar();
  const setToken = useContextSelector(RootContext, (values) => values.setToken);
  const setClient = useContextSelector(
    RootContext,
    (values) => values.setClient,
  );
  const router = useRouting();
  const [activeStep, setActiveStep] = useState<AUTHENTICATION_STEPS>(
    AUTHENTICATION_STEPS.AskForCpfPage,
  );

  const persistUserToken = useCallback(async (userToken) => {
    await StorageService.setData({
      key: 'token',
      value: JSON.stringify(userToken),
    });
    setToken(userToken);
  }, []);

  const handleSetActiveStep = useCallback(
    (_activeStep: keyof typeof AUTHENTICATION_STEPS) => {
      setActiveStep(AUTHENTICATION_STEPS[_activeStep]);
    },
    [],
  );

  const { mutate } =
    ApiService.resources.client.clientMutations.useCreateClientMutation();

  function onFormSubmit(values: ClientDto.ICreateClient) {
    const { cpf: _cpf, phone: _phone, ...restValues } = values;
    const unMaskedValues = {
      ...restValues,
      cpf: unMask(_cpf, ['999.999.999-99']) as string,
      phone: unMask(_phone, ['(99) 99999-9999']) as string,
    };
    mutate(unMaskedValues, {
      onSuccess: async (data) => {
        setClient(data);
        await StorageService.setData({
          key: 'client',
          value: JSON.stringify(data),
        });
        router.replace({
          routeName: 'identification-done',
          web: {
            path: 'auth/identification/done',
          },
        });
      },
      onError: (error) => {
        if (error.response?.status === 409) {
          showSnackBar(
            error.response?.data?.message ??
              'Ops! Um erro inesperado aconteceu, tente novamente mais tarde.',
          );
        } else {
          showSnackBar(
            'Ops! Um erro inesperado aconteceu, tente novamente mais tarde.',
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

  return (
    <AuthContext.Provider
      value={{
        handleSetActiveStep,
        persistUserToken,
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
              icon="arrow-left"
              onPress={() => {
                goBackService();
              }}
            />
          )}
        </View>
        <Image
          source={require('../../../assets/logoDefault.png')}
          resizeMode="contain"
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
