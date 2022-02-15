import React, { useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';
import { AuthContext } from '../../context';
import { useFocusEffect, useRouting } from 'expo-next-react-navigation';
import { SizedBox } from '../../../../components/SizedBox';
import { useContextSelector } from 'use-context-selector';
import { mask, unMask } from 'remask';
import { Formik } from 'formik';
import { yup } from '../../../../utils/yup';

const yupValidationSchema = yup.object().shape({
  cpf: yup.string().required().isCPFValid().label('CPF'),
});

export function AskForCpfPage() {
  const handleSetActiveStep = useContextSelector(
    AuthContext,
    (values) => values.handleSetActiveStep,
  );
  const setUserCpf = useContextSelector(
    AuthContext,
    (values) => values.setUserCpf,
  );
  const userState = useContextSelector(
    AuthContext,
    (values) => values.userState,
  );

  useFocusEffect(
    useCallback(() => {
      handleSetActiveStep('AskForCpfPage');
    }, [handleSetActiveStep]),
  );

  const router = useRouting();

  // const [cpf, setCpf] = React.useState(mask(userState.cpf, ['999.999.999-99']));

  function onFormSubmit(values) {
    const { cpf } = values;
    const _cpf = unMask(cpf);
    console.log(_cpf);
    setUserCpf(_cpf);
    router.navigate({
      routeName: 'auth/identification',
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
              console.log('touched', touched);
              console.log('isValid', isValid);
              console.log('errors', errors);
              console.log('teste', !!touched.cpf && errors.cpf);
            })()}
            <View>
              <TextInput
                label="CPF"
                placeholder="Digite seu CPF"
                style={{ alignSelf: 'stretch' }}
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
                disabled={!isValid}
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
