import { useFocusEffect, useRouting } from 'expo-next-react-navigation';
import React, { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { useContextSelector } from 'use-context-selector';
import { SizedBox } from '../../../../components/SizedBox';
import { AuthContext } from '../../context';
import { mask, unMask } from 'remask';
import { yup } from '../../../../utils/yup';
import { ApiService } from '../../../../services';
import { Formik } from 'formik';
import { transformClientIntoUser } from '../../../../../_dos/user';

const yupValidationSchema = yup.object().shape({
  name: yup.string().required().label('Nome'),
  phone: yup.string().required().label('Telefone'),
  email: yup.string().required().email().label('Email'),
});

export function IdentificationPage() {
  const router = useRouting();

  const handleSetActiveStep = useContextSelector(
    AuthContext,
    (values) => values.handleSetActiveStep,
  );

  const setUser = useContextSelector(AuthContext, (values) => values.setUser);
  const userState = useContextSelector(
    AuthContext,
    (values) => values.userState,
  );

  useFocusEffect(
    useCallback(() => {
      handleSetActiveStep('IdentificationPage');
    }, [handleSetActiveStep]),
  );

  const [loading, setLoading] = useState(false);

  function onFormSubmit(values) {
    setLoading(true);

    const { name, phone, email } = values;
    const _phone = unMask(phone, ['(99) 99999-9999']);

    ApiService.resources.client
      .createClient({
        cpf: userState.cpf,
        name,
        phone: _phone,
        email,
      })
      .then((response) => {
        console.log('res', response);
        if (response.status === 201) {
          const user = transformClientIntoUser(response.data);
          setUser(user);
          router.replace({
            routeName: 'identification-done',
            web: {
              path: 'auth/identification/done',
            },
          });
        }
      })
      .catch((error) => {
        //
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#eeeeee',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
      }}
    >
      <SizedBox h={0} />
      <Formik
        initialValues={{
          name: userState.personalData.name,
          phone: mask(userState.personalData.phone, ['(99) 99999-9999']),
          email: userState.personalData.email,
        }}
        onSubmit={onFormSubmit}
        validateOnMount
        validationSchema={yupValidationSchema}
        enableReinitialize
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          touched,
        }) => (
          <>
            <View style={{ alignSelf: 'stretch', backgroundColor: '#eeeeee' }}>
              <>
                <TextInput
                  label="Nome"
                  placeholder="Digite seu nome"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                />
                <HelperText
                  type="error"
                  visible={!!touched.name && errors.name}
                >
                  {errors.name}
                </HelperText>
              </>
              <SizedBox h={32} />
              <>
                <TextInput
                  label="Telefone"
                  placeholder="Digite seu telefone"
                  value={mask(values.phone, ['(99) 99999-9999'])}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                />
                <HelperText
                  type="error"
                  visible={!!touched.phone && errors.phone}
                >
                  {errors.phone}
                </HelperText>
              </>
              <SizedBox h={32} />
              <>
                <TextInput
                  label="Email"
                  placeholder="Digite seu email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                <HelperText
                  type="error"
                  visible={!!touched.email && errors.email}
                >
                  {errors.email}
                </HelperText>
              </>
            </View>
            <View>
              <SizedBox h={32} />
              <Button
                loading={loading}
                disabled={loading || !isValid}
                mode="contained"
                onPress={handleSubmit}
              >
                Avançar
              </Button>
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
}
