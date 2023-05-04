import { Icon, SizedBox, TextInput, Text } from '@mytable/components';
import { EnvironmentWithImage } from '@mytable/domain';
import { AppPageWrapper } from 'components/AppPageWrapper';
import { useFormik } from 'formik';
import React, { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Button } from 'react-native-paper';
import { yup } from 'utils/yup';
import { useRouter } from 'next/router';
import { useRestaurantWithInfo } from '#/hooks/api/restaurant/useRestaurantWithInfo';
import LoadingScreen from '~/pages/Loading';
import { useCreateReservationOrderWithClientIdentifier } from '#/hooks/api/reservationOrder/useCreateReservationOrderWithClientIdentifier';
import { useSnackbar } from '#/hooks/useSnackbar';

const validationSchema = yup.object().shape({
  clientIdentifier: yup
    .string()
    .required()
    .label('Identificador único do cliente'),
  date: yup.string().required().label('Dia da reserva'),
  startTime: yup.string().required().label('Horário de início da reserva'),
  endTime: yup.string().required().label('Horário de fim da reserva'),
  peopleAmount: yup.string().required().label('Tamanho da mesa'),
  environmentId: yup.number().required().label('Ambiente'),
});

export default function AppReservationOrderCreatePage() {
  const [isEnvironmentPickerVisible, setIsEnvironmentPickerVisible] =
    useState(false);
  const [selectedEnvironment, setSelectedEnvironment] =
    useState<EnvironmentWithImage | null>(null);

  const router = useRouter();
  const snackbar = useSnackbar();

  const { data: restaurant, isLoading: isRestaurantLoading } =
    useRestaurantWithInfo();

  const { mutate: createReservationOrder } =
    useCreateReservationOrderWithClientIdentifier({
      onError: (error) => {
        snackbar.showSnackbar(error?.error?.message);
      },
    });

  const environments = useMemo(
    () => restaurant?.environments ?? [],
    [restaurant]
  );

  const formik = useFormik({
    validationSchema,
    initialValues: {
      clientIdentifier: '',
      date: '',
      startTime: '',
      endTime: '',
      peopleAmount: '',
      environmentId: '',
    },
    onSubmit: (values) => {
      createReservationOrder({
        clientIdentifier: values.clientIdentifier,
        date: values.date,
        endTime: values.endTime,
        environmentId: parseInt(values.environmentId, 10),
        peopleAmount: parseInt(values.peopleAmount, 10),
        startTime: values.startTime,
      });
      router.back();
    },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    validateOnMount: true,
  });

  if (isRestaurantLoading) {
    return <LoadingScreen />;
  }

  return (
    <AppPageWrapper isLoading={false}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.9, flexDirection: 'row' }}>
          <View style={{ flex: 1.4 }}>
            <TextInput
              label='Identificador único do cliente'
              placeholder='Digite o identificador do cliente'
              value={formik.values.clientIdentifier}
              onChangeText={formik.handleChange('clientIdentifier')}
              onBlur={formik.handleBlur('clientIdentifier')}
            />

            <SizedBox h={32} />

            <TextInput
              label='Dia da reserva'
              placeholder='Ex.: 23/04/2023'
              value={formik.values.date}
              onChangeText={formik.handleChange('date')}
              onBlur={formik.handleBlur('date')}
            />

            <SizedBox h={32} />

            <View style={{ flexDirection: 'row' }}>
              <TextInput
                label='Início'
                placeholder='Ex.: 18:00'
                value={formik.values.startTime}
                onChangeText={formik.handleChange('startTime')}
                onBlur={formik.handleBlur('startTime')}
                style={{ width: '45%' }}
              />

              <SizedBox w={12} />

              <TextInput
                label='Fim'
                placeholder='Ex.: 20:00'
                value={formik.values.endTime}
                onChangeText={formik.handleChange('endTime')}
                onBlur={formik.handleBlur('endTime')}
                style={{ width: '45%' }}
              />
            </View>

            <SizedBox h={48} />

            <TextInput
              label='Tamanho da mesa'
              placeholder='Digite a quantidade de pessoas para a reserva'
              value={formik.values.peopleAmount}
              onChangeText={formik.handleChange('peopleAmount')}
              onBlur={formik.handleBlur('peopleAmount')}
            />
          </View>

          <SizedBox w={24} />

          <View style={{ flex: 1 }}>
            <Pressable
              style={{
                flexGrow: 0,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                setIsEnvironmentPickerVisible((prev) => !prev);
              }}
            >
              <Text size='lg'>
                {selectedEnvironment?.name ?? 'Selecione um ambiente'}
              </Text>
              <SizedBox w={4} />
              <Icon
                name='chevron-down'
                size={16}
              />
            </Pressable>
            <SizedBox h={12} />
            <View
              style={{
                flex: 1,
                display: isEnvironmentPickerVisible ? 'flex' : 'none',
              }}
            >
              {environments.map((environment) => (
                <React.Fragment key={environment.id}>
                  <Pressable
                    onPress={() => {
                      setSelectedEnvironment(environment);
                      formik.setFieldValue(
                        'environmentId',
                        environment.id,
                        true
                      );
                      setIsEnvironmentPickerVisible(false);
                    }}
                  >
                    <Text size='md'>{environment.name}</Text>
                  </Pressable>
                  <SizedBox h={12} />
                </React.Fragment>
              ))}
            </View>
          </View>
        </View>

        <SizedBox h={32} />

        <View style={{ flex: 0.1, alignItems: 'center' }}>
          <Button
            loading={formik.isSubmitting}
            disabled={formik.isSubmitting || !formik.isValid}
            mode='contained'
            onPress={formik.handleSubmit}
          >
            Criar
          </Button>
        </View>
      </View>
    </AppPageWrapper>
  );
}
