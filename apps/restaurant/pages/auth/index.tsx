import React, { useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import { Paper, TextInput, SizedBox, Text } from '@mytable/components';
import { Button } from 'react-native-paper';
import { yup } from 'utils/yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useSignInEmployee } from '#/hooks/api/auth/useSignInEmployee';
import { useStorageService } from '#/hooks/storage';
import { STORAGE_KEYS } from '#/services/storage/keys';

const validationSchema = yup.object().shape({
  username: yup.string().required().label('Usuário'),
  password: yup.string().required().label('Senha'),
});

export default function AuthPage() {
  const router = useRouter();
  const storageService = useStorageService();

  const getAccessToken = () =>
    storageService.getData(STORAGE_KEYS.ACCESS_TOKEN);

  const redirectToApp = async () => {
    router.push({ pathname: '/app', query: { returnUrl: router.asPath } });
  };

  const handleAccessTokenPresence = async () => {
    const accessToken = await getAccessToken();

    if (accessToken) {
      redirectToApp();
    }
  };

  useEffect(() => {
    handleAccessTokenPresence();
  }, []);

  const { mutate, isLoading } = useSignInEmployee({
    onSuccess: async (response) => {
      console.log('data', response.data);
      await storageService.setData(
        STORAGE_KEYS.ACCESS_TOKEN,
        JSON.stringify(response.data.accessToken)
      );
      await storageService.setData(
        STORAGE_KEYS.EMPLOYEE,
        JSON.stringify(response.data.employee)
      );
      // now should show app page
      await router.push('/app');
      router.reload();
    },
    onError: (error) => {
      console.log('err', error);
    },
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      mutate(values);
    },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
      }}
    >
      <Paper style={{ flex: 0.4, borderRadius: 8, padding: 24 }}>
        <SizedBox h={24} />
        <Text size='xxxlg'>Autenticação</Text>
        <SizedBox h={24} />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <TextInput
            label='Usuário'
            placeholder='Digite seu usuário'
            value={formik.values.username}
            onChangeText={formik.handleChange('username')}
            onBlur={formik.handleBlur('username')}
            style={{ width: '75%' }}
          />
          <SizedBox h={48} />
          <TextInput
            label='Senha'
            placeholder='Digite sua senha'
            secureTextEntry
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            style={{ width: '75%' }}
            disabled={isLoading}
          />
          <SizedBox h={48} />
        </View>
        <Button
          loading={isLoading}
          mode='contained'
          style={{ alignSelf: 'center', width: '40%' }}
          onPress={formik.submitForm}
        >
          Autenticar
        </Button>
        <SizedBox h={24} />
      </Paper>
      <SizedBox w={Dimensions.get('window').width / 8} />
    </View>
  );
}
