import { SizedBox, Text, TextInput } from '@mytable/components';
import { RestaurantWithInfo } from '@mytable/domain';
import { useFormik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { yup } from 'utils/yup';

const infoSchemaValidation = yup.object().shape({
  name: yup.string().required().label('Nome do restaurante'),
  address: yup.string().required().label('Endereço'),
  ownerName: yup.string().required().label('Nome do dono'),
});

export type RestaurantInfoFormProps = {
  restaurant?: RestaurantWithInfo;
};

export function RestaurantInfoForm({ restaurant }: RestaurantInfoFormProps) {
  const infoFormik = useFormik({
    validationSchema: infoSchemaValidation,
    initialValues: {
      name: restaurant?.name ?? '',
      address: restaurant?.address ?? '',
      ownerName: restaurant?.ownerName ?? '',
    },
    onSubmit: () => {},
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
  });

  return (
    <>
      <Text size='xxxlg'>Informações</Text>
      <SizedBox h={24} />
      <View>
        <TextInput
          label='Nome do restaurante'
          placeholder='Digite o nome do restaurante'
          value={infoFormik.values.name}
          onChangeText={infoFormik.handleChange('name')}
          onBlur={infoFormik.handleBlur('name')}
          error={infoFormik.errors.name}
          touched={infoFormik.touched.name}
          style={{ width: '75%' }}
        />
        <SizedBox h={32} />
        <TextInput
          label='Endereco'
          placeholder='Digite o endereço do restaurante'
          value={infoFormik.values.address}
          onChangeText={infoFormik.handleChange('address')}
          onBlur={infoFormik.handleBlur('address')}
          error={infoFormik.errors.address}
          touched={infoFormik.touched.address}
          style={{ width: '75%' }}
        />
        <SizedBox h={32} />
        <TextInput
          label='Nome do dono'
          placeholder='Digite o nome do dono do restaurante'
          value={infoFormik.values.ownerName}
          onChangeText={infoFormik.handleChange('ownerName')}
          onBlur={infoFormik.handleBlur('ownerName')}
          error={infoFormik.errors.ownerName}
          touched={infoFormik.touched.ownerName}
          style={{ width: '75%' }}
        />
      </View>
    </>
  );
}
