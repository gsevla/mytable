import React, { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';
import { AuthContext } from '../../context';
import { useFocusEffect, useRouting } from 'expo-next-react-navigation';
import { SizedBox } from '../../../../components/SizedBox';
import { useContextSelector } from 'use-context-selector';
import { mask, unMask } from 'remask';
import { Formik } from 'formik';
import { yup } from '../../../../utils/yup';
import { ApiService, StorageService } from '../../../../services';
import { IUser, transformClientIntoUser } from '../../../../../_dos/user';

const yupValidationSchema = yup.object().shape({
  cpf: yup.string().required().isCPFValid().label('CPF'),
});

export function AskForCpfPage() {
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
      handleSetActiveStep('AskForCpfPage');
    }, [handleSetActiveStep]),
  );

  const [loading, setLoading] = useState(false);

  async function onFormSubmit(values) {
    setLoading(true);
    const { cpf } = values;
    const _cpf: string = unMask(cpf);
    // setUser({ cpf: _cpf });
    ApiService.resources.client
      .getClientByCpf(_cpf)
      .then((response) => {
        console.log('res', response);
        if (response.status === 200) {
          const user = transformClientIntoUser(response.data);
          setUser(user);
          router.replace({
            routeName: 'identification-done',
            web: {
              path: 'auth/identification/done',
            },
          });
        } else {
          setUser({ cpf: _cpf });
          router.navigate({
            routeName: 'identification',
            web: {
              path: 'auth/identification',
            },
          });
        }
      })
      .catch((_error) => {
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
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#eeeeee',
        paddingHorizontal: 24,
      }}
    >
      <SizedBox h={0} />
      <Formik
        initialValues={{ cpf: mask(userState.cpf, ['999.999.999-99']) }}
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
            {(() => {
              console.log('isValid', isValid);
            })()}
            <View style={{ alignSelf: 'stretch' }}>
              <TextInput
                label="CPF"
                placeholder="Digite seu CPF"
                value={mask(values.cpf, ['999.999.999-99'])}
                onChangeText={handleChange('cpf')}
                onBlur={handleBlur('cpf')}
              />
              <HelperText type="error" visible={!!touched.cpf && errors.cpf}>
                {errors.cpf}
              </HelperText>
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
