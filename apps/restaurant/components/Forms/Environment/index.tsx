import React from 'react';
import { CreateEnvironmentInput, Environment } from '@mytable/domain';
import { FormikHelpers, FormikValues, Field, FieldArray, Formik } from 'formik';
import { TextInput, SizedBox, Text } from '@mytable/components';
import { View } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
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
  images: yup.array().of(
    yup.object().shape({
      addr: yup.string().required().label('Endereço'),
      description: yup.string().label('Descrição'),
    })
  ),
});

const editSchema = yup.object().shape({
  name: yup.string().required().label('Nome'),
  description: yup.string().label('Descrição'),
  capacity: yup.number().required().label('Capacidade'),
  images: yup.array().of(
    yup.object().shape({
      addr: yup.string().required().label('Endereço'),
      description: yup.string().label('Descrição'),
    })
  ),
});

export function EnvironmentForm({
  environment,
  onFormSubmit,
}: EnvironmentFormProps | EnvironmentEditFormProps) {
  const isEditing = typeof environment !== 'undefined';

  const validationSchema = !isEditing ? createSchema : editSchema;

  const buttonLabel = !isEditing ? 'Criar' : 'Editar';

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        name: environment?.name ?? '',
        description: environment?.description ?? '',
        capacity: environment?.capacity ?? '',
        images: environment?.images ?? [],
      }}
      onSubmit={onFormSubmit}
      enableReinitialize
      validateOnChange={false}
      validateOnBlur
    >
      {(formik) => (
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

          <FieldArray
            name='images'
            render={(arrayHelpers) => (
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text size='xxlg'>Imagens</Text>
                  <IconButton
                    icon='plus'
                    size={32}
                    onPress={() => {
                      arrayHelpers.push({ addr: '', description: '' });
                    }}
                  />
                </View>
                {formik.values.images.map((image, index) => (
                  <View
                    key={`images-${index}`}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingLeft: 24,
                    }}
                  >
                    <View style={{ alignItems: 'center' }}>
                      <IconButton
                        icon='minus'
                        size={32}
                        onPress={() => {
                          arrayHelpers.remove(index);
                        }}
                      />
                    </View>
                    <SizedBox w={12} />
                    <View style={{ flex: 1 }}>
                      <Text size='xlg'>Imagem {index + 1}</Text>
                      <SizedBox h={12} />
                      <Field
                        name={`images[${index}].addr`}
                        as={TextInput}
                        label='Endereço'
                        placeholder='Digite o endereço da imagem'
                        value={formik.values.images[index].addr}
                        onChangeText={formik.handleChange(
                          `images[${index}].addr`
                        )}
                        onBlur={formik.handleBlur(`images[${index}].addr`)}
                        style={{ width: '50%' }}
                      />

                      <SizedBox h={32} />

                      <Field
                        name={`images[${index}].description`}
                        as={TextInput}
                        label='Descrição'
                        placeholder='Digite uma descrição para a imagem'
                        value={formik.values.images[index].description}
                        onChange={formik.handleChange(
                          `images[${index}].description`
                        )}
                        onBlur={formik.handleBlur(
                          `images[${index}].description`
                        )}
                        style={{ width: '50%' }}
                        multiline
                      />
                      <SizedBox h={32} />
                    </View>
                  </View>
                ))}
              </View>
            )}
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
      )}
    </Formik>
  );
}
