import React, { useState } from 'react';
import {
  CreateEmployeeInput,
  EmployeeRole,
  EmployeeWithoutPassword,
} from '@mytable/domain';
import { FormikHelpers, FormikValues, useFormik } from 'formik';
import { TextInput, SizedBox, Icon } from '@mytable/components';
import { Pressable, View } from 'react-native';
import { Button, RadioButton, Subheading, Text } from 'react-native-paper';
import { yup } from '../../../utils/yup';

type EmployeeFormProps = {
  onFormSubmit(
    values: CreateEmployeeInput,
    handlers: FormikHelpers<FormikValues>
  ): void;
};

type EmployeeEditFormProps = EmployeeFormProps & {
  employee: EmployeeWithoutPassword;
};

const createSchema = yup.object().shape({
  name: yup.string().required().label('Nome'),
  surname: yup.string().required().label('Sobrenome'),
  username: yup.string().required().label('Telefone'),
  password: yup.string().required().label('Senha'),
  role: yup.string().required().label('Tipo').oneOf(['ORDINARY', 'ADMIN']),
});

const editSchema = yup.object().shape({
  name: yup.string().required().label('Nome'),
  surname: yup.string().required().label('Sobrenome'),
  username: yup.string().required().label('Telefone'),
  password: yup.string().label('Senha'),
  role: yup.string().required().label('Tipo').oneOf(['ORDINARY', 'ADMIN']),
});

export function EmployeeForm({
  employee,
  onFormSubmit,
}: EmployeeFormProps | EmployeeEditFormProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isEditing = typeof employee !== 'undefined';

  const validationSchema = !isEditing ? createSchema : editSchema;
  const formik = useFormik({
    validationSchema,
    initialValues: {
      name: employee?.name ?? '',
      surname: employee?.surname ?? '',
      username: employee?.username ?? '',
      password: '',
      role: employee?.role ?? EmployeeRole.ORDINARY,
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
        placeholder='Digite seu nome'
        value={formik.values.name}
        onChangeText={formik.handleChange('name')}
        onBlur={formik.handleBlur('name')}
        style={{ width: '50%' }}
      />
      <SizedBox h={32} />

      <TextInput
        label='Sobrenome'
        placeholder='Digite seu sobrenome'
        value={formik.values.surname}
        onChangeText={formik.handleChange('surname')}
        onBlur={formik.handleBlur('surname')}
        style={{ width: '50%' }}
      />
      <SizedBox h={32} />

      <TextInput
        label='Usuário'
        placeholder='Digite seu usuário'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
        style={{ width: '50%' }}
        disabled={isEditing}
      />
      <SizedBox h={32} />

      <View
        style={{
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: '50%',
        }}
      >
        <TextInput
          label='Senha'
          placeholder='Digite sua senha'
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          secureTextEntry={!isPasswordVisible}
          style={{ width: '100%' }}
        />
        <Pressable
          onPress={() => setIsPasswordVisible((prev) => !prev)}
          style={{ position: 'absolute', right: 24 }}
        >
          <Icon name={!isPasswordVisible ? 'eye' : 'eye-off'} />
        </Pressable>
      </View>
      <SizedBox h={32} />

      <RadioButton.Group
        onValueChange={formik.handleChange('role')}
        value={formik.values.role}
      >
        <Subheading>Tipo</Subheading>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Text>Administrador</Text>
            <RadioButton value={EmployeeRole.ADMIN} />
          </View>
          <SizedBox w={32} />
          <View>
            <Text>Comum</Text>
            <RadioButton value={EmployeeRole.ORDINARY} />
          </View>
        </View>
      </RadioButton.Group>
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
