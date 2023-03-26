import React from 'react';
import { CreateEnvironmentInput, Environment } from '@mytable/domain';
import { FormikHelpers, FormikValues, useFormik } from 'formik';
import { TextInput, SizedBox } from '@mytable/components';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { yup } from '../../../utils/yup';

type EnvironmentFormProps = {
  onFormSubmit(
    values: CreateEnvironmentInput,
    handlers: FormikHelpers<FormikValues>
  ): void;
};

type EnvironmentEditFormProps = EnvironmentFormProps & {
  environment: Environment;
};

const createSchema = yup.object().shape({
  name: yup.string().required().label('Nome'),
  description: yup.string().label('Descrição'),
  capacity: yup.string().required().label('Capacidade'),
});

const editSchema = yup.object().shape({
  name: yup.string().required().label('Nome'),
  description: yup.string().label('Descrição'),
  capacity: yup.number().required().label('Capacidade'),
});

export function EnvironmentForm({
  environment,
  onFormSubmit,
}: EnvironmentFormProps | EnvironmentEditFormProps) {
  const isEditing = typeof environment !== 'undefined';

  const validationSchema = !isEditing ? createSchema : editSchema;
  const formik = useFormik({
    validationSchema,
    initialValues: {
      name: environment?.name ?? '',
      description: environment?.description ?? '',
      capacity: environment?.capacity ?? '',
    },
    onSubmit: onFormSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
  });

  const buttonLabel = !isEditing ? 'Criar' : 'Editar';

  return (
    <>
      <TextInput
        label='Nome'
        placeholder='Digite um nome para o seu ambiente'
        value={formik.values.name}
        onChangeText={formik.handleChange('name')}
        onBlur={formik.handleBlur('name')}
        style={{ width: '50%' }}
      />

      <SizedBox h={32} />

      <TextInput
        label='Descrição'
        placeholder='Digite a descrição do espaço'
        value={formik.values.description}
        onChangeText={formik.handleChange('description')}
        onBlur={formik.handleBlur('description')}
        style={{ width: '50%' }}
        multiline
      />

      <SizedBox h={32} />

      <TextInput
        label='Capacidade'
        placeholder='Digite a capacidade do espaço'
        value={formik.values.capacity}
        onChangeText={formik.handleChange('capacity')}
        onBlur={formik.handleBlur('capacity')}
        style={{ width: '50%' }}
      />

      <SizedBox h={32} />

      <View style={{ alignSelf: 'center' }}>
        <Button
          loading={formik.isSubmitting}
          disabled={formik.isSubmitting || !formik.isValid}
          mode='contained'
          onPress={formik.handleSubmit}
        >
          {buttonLabel}
        </Button>
      </View>
    </>
  );
}
