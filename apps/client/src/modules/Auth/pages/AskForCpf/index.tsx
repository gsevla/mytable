import React, { useCallback, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';
import { useFocusEffect, useRouting } from 'expo-next-react-navigation';
import { useContextSelector } from 'use-context-selector';
import { mask, unMask } from 'remask';
import { SizedBox } from '../../../../components/SizedBox';
import { AuthContext } from '../../context';
import { useShowSnackBar } from '../../../Root/hooks/useShowSnackBar';
import { useClientWithCpf } from '#hooks/api/client/useClientWithCpf';

export function AskForCpfPage() {
  const router = useRouting();
  const showSnackBar = useShowSnackBar();

  const handleSetActiveStep = useContextSelector(
    AuthContext,
    (values) => values.handleSetActiveStep
  );
  useFocusEffect(
    useCallback(() => {
      handleSetActiveStep('AskForCpfPage');
    }, [handleSetActiveStep])
  );

  const formik = useContextSelector(AuthContext, (values) => values.formik);
  const persistClient = useContextSelector(
    AuthContext,
    (values) => values.persistClient
  );

  const scrollRef = useRef<ScrollView>(null);

  const { refetch, isLoading, isRefetching } = useClientWithCpf(
    unMask(formik.values.cpf),
    {
      enabled: false,
      retry: false,
      onSuccess: (data) => {
        persistClient(data?.data);
      },
      onError: async (error) => {
        if (error?.status === 404) {
          router.navigate({
            routeName: 'identification',
            web: {
              path: 'auth/identification',
            },
          });
        } else {
          showSnackBar(
            error?.error?.message ??
              'Ops! Um erro inesperado aconteceu, tente novamente mais tarde.'
          );
        }
      },
    }
  );

  return (
    <ScrollView
      ref={scrollRef}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#eeeeee',
        paddingHorizontal: 24,
      }}
    >
      <SizedBox h={0} />
      <>
        <View style={{ alignSelf: 'stretch', backgroundColor: '#eeeeee' }}>
          <TextInput
            label='CPF'
            placeholder='Digite seu CPF'
            keyboardType='numeric'
            value={mask(formik.values.cpf, ['999.999.999-99'])}
            onChangeText={formik.handleChange('cpf')}
            onBlur={formik.handleBlur('cpf')}
            onSubmitEditing={() => {
              scrollRef.current?.scrollToEnd();
            }}
          />
          <HelperText
            type='error'
            visible={!!formik.touched.cpf && !!formik.errors.cpf}
          >
            {formik.errors.cpf}
          </HelperText>
        </View>
        <View>
          <SizedBox h={32} />
          <Button
            loading={isLoading || isRefetching}
            disabled={isLoading || isRefetching || !formik.values.cpf}
            mode='contained'
            onPress={refetch}
          >
            Avançar
          </Button>
        </View>
      </>
    </ScrollView>
  );
}
