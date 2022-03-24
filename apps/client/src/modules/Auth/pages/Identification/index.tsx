import { useFocusEffect } from 'expo-next-react-navigation';
import React, { useCallback, useRef } from 'react';
import { ScrollView, View, TextInput as RNTextInput } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { useContextSelector } from 'use-context-selector';
import { SizedBox } from '../../../../components/SizedBox';
import { AuthContext } from '../../context';
import { mask } from 'remask';

export function IdentificationPage() {
  const handleSetActiveStep = useContextSelector(
    AuthContext,
    (values) => values.handleSetActiveStep,
  );
  useFocusEffect(
    useCallback(() => {
      handleSetActiveStep('IdentificationPage');
    }, [handleSetActiveStep]),
  );

  const formik = useContextSelector(AuthContext, (values) => values.formik);

  const scrollRef = useRef<ScrollView>(null);
  const nameInputRef = useRef<RNTextInput>(null);
  const surnameInputRef = useRef<RNTextInput>(null);
  const phoneInputRef = useRef<RNTextInput>(null);
  const emailInputRef = useRef<RNTextInput>(null);

  return (
    <ScrollView
      ref={scrollRef}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#eeeeee',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
      }}
    >
      <SizedBox h={0} />
      <>
        <View style={{ alignSelf: 'stretch', backgroundColor: '#eeeeee' }}>
          <>
            <TextInput
              ref={nameInputRef}
              label="Nome"
              returnKeyType="next"
              placeholder="Digite seu nome"
              value={formik.values.name}
              onChangeText={formik.handleChange('name')}
              onBlur={formik.handleBlur('name')}
              onSubmitEditing={() => {
                surnameInputRef.current?.focus();
              }}
            />
            <HelperText
              type="error"
              visible={!!formik.touched.name && !!formik.errors.name}
            >
              {formik.errors.name}
            </HelperText>
          </>
          <SizedBox h={32} />
          <>
            <TextInput
              ref={surnameInputRef}
              label="Sobrenome"
              returnKeyType="next"
              placeholder="Digite seu sobrenome"
              value={formik.values.surname}
              onChangeText={formik.handleChange('surname')}
              onBlur={formik.handleBlur('surname')}
              onSubmitEditing={() => {
                phoneInputRef.current?.focus();
              }}
            />
            <HelperText
              type="error"
              visible={!!formik.touched.surname && !!formik.errors.surname}
            >
              {formik.errors.surname}
            </HelperText>
          </>
          <SizedBox h={32} />
          <>
            <TextInput
              ref={phoneInputRef}
              label="Telefone"
              keyboardType="phone-pad"
              returnKeyType="next"
              placeholder="Digite seu telefone"
              value={mask(formik.values.phone, ['(99) 99999-9999'])}
              onChangeText={formik.handleChange('phone')}
              onBlur={formik.handleBlur('phone')}
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />
            <HelperText
              type="error"
              visible={!!formik.touched.phone && !!formik.errors.phone}
            >
              {formik.errors.phone}
            </HelperText>
          </>
          <SizedBox h={32} />
          <>
            <TextInput
              ref={emailInputRef}
              label="Email"
              placeholder="Digite seu email"
              value={formik.values.email}
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              onSubmitEditing={() => {
                scrollRef.current?.scrollToEnd();
              }}
            />
            <HelperText
              type="error"
              visible={!!formik.touched.email && !!formik.errors.email}
            >
              {formik.errors.email}
            </HelperText>
          </>
        </View>
        <View>
          <SizedBox h={32} />
          <Button
            loading={formik.isSubmitting}
            disabled={formik.isSubmitting || !formik.isValid}
            mode="contained"
            onPress={formik.handleSubmit}
          >
            Avançar
          </Button>
        </View>
      </>
    </ScrollView>
  );
}
