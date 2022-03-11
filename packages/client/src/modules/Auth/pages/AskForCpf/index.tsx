import React, { useCallback, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';
import { AuthContext } from '../../context';
import { useFocusEffect, useRouting } from 'expo-next-react-navigation';
import { SizedBox } from '../../../../components/SizedBox';
import { useContextSelector } from 'use-context-selector';
import { mask, unMask } from 'remask';
import { ApiService, StorageService } from '../../../../services';
import { RootContext } from '../../../Root/context';
import { useShowSnackBar } from '../../../Root/hooks/useShowSnackBar';

export function AskForCpfPage() {
  const router = useRouting();
  const showSnackBar = useShowSnackBar();

  const handleSetActiveStep = useContextSelector(
    AuthContext,
    (values) => values.handleSetActiveStep,
  );
  useFocusEffect(
    useCallback(() => {
      handleSetActiveStep('AskForCpfPage');
    }, [handleSetActiveStep]),
  );

  const formik = useContextSelector(AuthContext, (values) => values.formik);
  const setClient = useContextSelector(
    RootContext,
    (values) => values.setClient,
  );

  const scrollRef = useRef<ScrollView>(null);

  const { refetch, isLoading, isRefetching } =
    ApiService.resources.client.clientQueries.useQueryClientByCpf(
      unMask(formik.values.cpf),
      {
        enabled: false,
        retry: false,
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
        onError: async (error) => {
          if (error.response?.status === 404) {
            router.navigate({
              routeName: 'identification',
              web: {
                path: 'auth/identification',
              },
            });
          } else {
            showSnackBar(
              error.response?.data?.message ??
                'Ops! Um erro inesperado aconteceu, tente novamente mais tarde.',
            );
          }
        },
      },
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
            label="CPF"
            placeholder="Digite seu CPF"
            keyboardType="numeric"
            // value={formik.values.cpf}
            value={mask(formik.values.cpf, ['999.999.999-99'])}
            onChangeText={formik.handleChange('cpf')}
            onBlur={formik.handleBlur('cpf')}
            onSubmitEditing={() => {
              scrollRef.current?.scrollToEnd();
            }}
          />
          <HelperText
            type="error"
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
            mode="contained"
            onPress={refetch}
          >
            Avançar
          </Button>
        </View>
      </>
    </ScrollView>
  );
}
