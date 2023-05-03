import React from 'react';
import { RestaurantWithInfo } from '@mytable/domain';
import { yup } from 'utils/yup';
import { useFormik } from 'formik';
import { SizedBox, Text, TextInput } from '@mytable/components';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useUpdateRestaurant } from '#/hooks/api/restaurant/useUpdateRestaurant';

const styleSchemaValidation = yup.object().shape({
  primaryColor: yup.string().required().label('Cor primária'),
  accentColor: yup.string().required().label('Cor de destaque'),
  coverImage: yup.string().label('Imagem de capa'),
});

export type RestaurantStyleFormProps = {
  restaurant?: RestaurantWithInfo;
};

export function RestaurantStyleForm({ restaurant }: RestaurantStyleFormProps) {
  const { mutate, isLoading } = useUpdateRestaurant();

  const styleFormik = useFormik({
    validationSchema: styleSchemaValidation,
    initialValues: {
      primaryColor: restaurant?.primaryColor ?? '',
      accentColor: restaurant?.accentColor ?? '',
      coverImage: restaurant?.coverImage ?? '',
    },
    onSubmit: (values) => {
      mutate({
        id: restaurant?.id as number,
        ...values,
      });
    },
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
  });

  return (
    <>
      <Text size='xxxlg'>Estilo</Text>
      <SizedBox h={24} />
      <View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <TextInput
              label='Cor primária'
              placeholder='Digite a cor primária do restaurante (hexadecimal)'
              value={styleFormik.values.primaryColor}
              onChangeText={styleFormik.handleChange('primaryColor')}
              onBlur={styleFormik.handleBlur('primaryColor')}
              error={styleFormik.errors.primaryColor}
              touched={styleFormik.touched.primaryColor}
              style={{ width: '75%' }}
            />
          </View>
          <SizedBox h={32} />
          <View style={{ flex: 1 }}>
            <TextInput
              label='Cor de destaque'
              placeholder='Digite a cor primária de destaque do restaurante (hexadecimal)'
              value={styleFormik.values.accentColor}
              onChangeText={styleFormik.handleChange('accentColor')}
              onBlur={styleFormik.handleBlur('accentColor')}
              error={styleFormik.errors.accentColor}
              touched={styleFormik.touched.accentColor}
              style={{ width: '75%' }}
            />
          </View>
        </View>
        <SizedBox h={32} />
        <TextInput
          label='Imagem de capa'
          placeholder='Digite o endereço(url) da imagem de capa'
          value={styleFormik.values.coverImage}
          onChangeText={styleFormik.handleChange('coverImage')}
          onBlur={styleFormik.handleBlur('coverImage')}
          error={styleFormik.errors.coverImage}
          touched={styleFormik.touched.coverImage}
          style={{ width: '75%' }}
        />
      </View>
      <SizedBox h={24} />
      <Button
        mode='contained'
        onPress={styleFormik.handleSubmit}
        loading={isLoading}
        disabled={isLoading}
        style={{ alignSelf: 'center' }}
      >
        Salvar
      </Button>
    </>
  );
}
