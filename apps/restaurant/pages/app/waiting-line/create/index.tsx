import { SizedBox, TextInput } from '@mytable/components';
import { useFormik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { yup } from 'utils/yup';
import { Button } from 'react-native-paper';
import { useRouter } from 'next/router';
import { useJoinWaitingQueue } from '#/hooks/api/waitingQueue/useJoinWaitingQueue';
import { AppPageWrapper } from '#/components/AppPageWrapper';

const validationSchema = yup.object().shape({
  clientIdentifier: yup
    .string()
    .required()
    .label('Identificador único do cliente'),
  name: yup.string().required().label('Nome do cliente'),
  tableSize: yup.string().required().label('Tamanho da mesa'),
});

export default function AppWaitingLineCreate() {
  const router = useRouter();
  const { mutate: joinWaitingQueue } = useJoinWaitingQueue();

  const formik = useFormik({
    validationSchema,
    initialValues: {
      clientIdentifier: '',
      name: '',
      tableSize: '1',
    },
    onSubmit: (values) => {
      joinWaitingQueue({
        clientIdentifier: values.clientIdentifier,
        name: values.name,
        tableSize: parseInt(values.tableSize, 10),
      });
      router.back();
    },
    enableReinitialize: false,
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <AppPageWrapper isLoading={false}>
      <View style={{ flex: 0.9 }}>
        <TextInput
          label='Identificador único do cliente'
          placeholder='Digite um identificador único para o cliente'
          value={formik.values.clientIdentifier}
          onChangeText={formik.handleChange('clientIdentifier')}
          onBlur={formik.handleBlur('clientIdentifier')}
          style={{ width: '50%' }}
        />

        <SizedBox h={32} />

        <TextInput
          label='Nome do cliente'
          placeholder='Digite o nome do cliente'
          value={formik.values.name}
          onChangeText={formik.handleChange('name')}
          onBlur={formik.handleBlur('name')}
          style={{ width: '50%' }}
        />

        <SizedBox h={32} />

        <TextInput
          label='Tamanho da mesa'
          placeholder='Digite a quantidade de pessoas para a mesa'
          value={formik.values.tableSize}
          onChangeText={formik.handleChange('tableSize')}
          onBlur={formik.handleBlur('tableSize')}
          style={{ width: '50%' }}
        />
      </View>

      <SizedBox h={32} />

      <View style={{ alignSelf: 'center', flex: 0.1 }}>
        <Button
          loading={formik.isSubmitting}
          disabled={formik.isSubmitting || !formik.isValid}
          mode='contained'
          onPress={formik.handleSubmit}
        >
          Adicionar à fila de espera
        </Button>
      </View>
    </AppPageWrapper>
  );
}
