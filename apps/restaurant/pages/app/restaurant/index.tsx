import { AppPageWrapper } from 'components/AppPageWrapper';
import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { yup } from 'utils/yup';
import { useFormik } from 'formik';
import { SizedBox, Text, TextInput } from '@mytable/components';
import { Divider, Switch } from 'react-native-paper';
import { Day, WorkingDay } from '@mytable/domain';
import { useRestaurantWithInfo } from '#/hooks/api/restaurant/useRestaurantWithInfo';

const dayMap = {
  [Day.MONDAY]: 'Segunda-Feira',
  [Day.TUESDAY]: 'Terça-Feira',
  [Day.WEDNESDAY]: 'Quarta-Feira',
  [Day.THURSDAY]: 'Quinta-Feira',
  [Day.FRIDAY]: 'Sexta-Feira',
  [Day.SATURDAY]: 'Sábado',
  [Day.SUNDAY]: 'Domingo',
};

const infoSchemaValidation = yup.object().shape({
  name: yup.string().required().label('Nome do restaurante'),
  address: yup.string().required().label('Endereço'),
  ownerName: yup.string().required().label('Nome do dono'),
});

const styleSchemaValidation = yup.object().shape({
  primaryColor: yup.string().required().label('Cor primária'),
  accentColor: yup.string().required().label('Cor de destaque'),
  coverImage: yup.string().label('Imagem de capa'),
});

const operationSchemaValidation = yup.object().shape({
  [Day.MONDAY]: yup
    .object({
      openingTime: yup.string().required().label('Horário de abertura'),
      closingTime: yup.string().required().label('Horário de fechamento'),
      open: yup.boolean().required().label('Estado de funcionamento'),
    })
    .required()
    .label(dayMap[Day.MONDAY]),
  [Day.TUESDAY]: yup
    .object({
      openingTime: yup.string().required().label('Horário de abertura'),
      closingTime: yup.string().required().label('Horário de fechamento'),
      open: yup.boolean().required().label('Estado de funcionamento'),
    })
    .required()
    .label(dayMap[Day.TUESDAY]),
  [Day.WEDNESDAY]: yup
    .object({
      openingTime: yup.string().required().label('Horário de abertura'),
      closingTime: yup.string().required().label('Horário de fechamento'),
      open: yup.boolean().required().label('Estado de funcionamento'),
    })
    .required()
    .label(dayMap[Day.WEDNESDAY]),
  [Day.THURSDAY]: yup
    .object({
      openingTime: yup.string().required().label('Horário de abertura'),
      closingTime: yup.string().required().label('Horário de fechamento'),
      open: yup.boolean().required().label('Estado de funcionamento'),
    })
    .required()
    .label(dayMap[Day.THURSDAY]),
  [Day.FRIDAY]: yup
    .object({
      openingTime: yup.string().required().label('Horário de abertura'),
      closingTime: yup.string().required().label('Horário de fechamento'),
      open: yup.boolean().required().label('Estado de funcionamento'),
    })
    .required()
    .label(dayMap[Day.FRIDAY]),
  [Day.SATURDAY]: yup
    .object({
      openingTime: yup.string().required().label('Horário de abertura'),
      closingTime: yup.string().required().label('Horário de fechamento'),
      open: yup.boolean().required().label('Estado de funcionamento'),
    })
    .required()
    .label(dayMap[Day.SATURDAY]),
  [Day.SUNDAY]: yup
    .object({
      openingTime: yup.string().required().label('Horário de abertura'),
      closingTime: yup.string().required().label('Horário de fechamento'),
      open: yup.boolean().required().label('Estado de funcionamento'),
    })
    .required()
    .label(dayMap[Day.SUNDAY]),
});

export default function AppRestaurantPage() {
  const { data: restaurant } = useRestaurantWithInfo();

  const workingDays = useMemo(() => {
    if (!restaurant) return [];

    return Object.entries(dayMap).map(([dayKey, dayValue]) => {
      const workingDay = restaurant.workingDays.find(
        (workingDay) => workingDay.day === dayKey
      );

      if (!workingDay)
        return {
          id: dayKey,
          day: dayValue,
          time: 'Fechado',
        };

      return {
        id: workingDay.id,
        day: dayValue,
        key: dayKey,
        openingTime: workingDay.openingTime,
        closingTime: workingDay.closingTime,
        open: workingDay.open,
      };
    });
  }, [restaurant]);

  const operationFormikInitialValues = useMemo(() => {
    if (workingDays.length === 0) {
      return {
        [Day.MONDAY]: {
          openingTime: '',
          closingTime: '',
          open: false,
        },
        [Day.TUESDAY]: {
          openingTime: '',
          closingTime: '',
          open: false,
        },
        [Day.WEDNESDAY]: {
          openingTime: '',
          closingTime: '',
          open: false,
        },
        [Day.THURSDAY]: {
          openingTime: '',
          closingTime: '',
          open: false,
        },
        [Day.FRIDAY]: {
          openingTime: '',
          closingTime: '',
          open: false,
        },
        [Day.SATURDAY]: {
          openingTime: '',
          closingTime: '',
          open: false,
        },
        [Day.SUNDAY]: {
          openingTime: '',
          closingTime: '',
          open: false,
        },
      };
    }

    return workingDays.reduce((accu, workingDay) => {
      accu[workingDay.key] = {
        openingTime: workingDay.openingTime ?? '',
        closingTime: workingDay.closingTime ?? '',
        open: workingDay.open ?? false,
      };
      return accu;
    }, {});
  }, [workingDays]);

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

  const styleFormik = useFormik({
    validationSchema: styleSchemaValidation,
    initialValues: {
      primaryColor: restaurant?.primaryColor ?? '',
      accentColor: restaurant?.accentColor ?? '',
      coverImage: restaurant?.coverImage ?? '',
    },
    onSubmit: () => {},
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const operationFormik = useFormik({
    validationSchema: operationSchemaValidation,
    initialValues: operationFormikInitialValues,
    onSubmit: () => {},
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
  });

  return (
    <AppPageWrapper isLoading={false}>
      <Text size='xxxlg'>Informações</Text>
      <SizedBox h={24} />
      <View>
        <TextInput
          label='Nome do restaurante'
          placeholder='Digite o nome do restaurante'
          value={infoFormik.values.name}
          onChangeText={infoFormik.handleChange('name')}
          onBlur={infoFormik.handleBlur('name')}
          style={{ width: '75%' }}
        />
        <SizedBox h={32} />
        <TextInput
          label='Endereco'
          placeholder='Digite o endereço do restaurante'
          value={infoFormik.values.address}
          onChangeText={infoFormik.handleChange('address')}
          onBlur={infoFormik.handleBlur('address')}
          style={{ width: '75%' }}
        />
        <SizedBox h={32} />
        <TextInput
          label='Nome do dono'
          placeholder='Digite o nome do dono do restaurante'
          value={infoFormik.values.ownerName}
          onChangeText={infoFormik.handleChange('ownerName')}
          onBlur={infoFormik.handleBlur('ownerName')}
          style={{ width: '75%' }}
        />
      </View>

      <SizedBox h={24} />
      <Divider />
      <SizedBox h={24} />
      <Text size='xxxlg'>Estilo</Text>
      <SizedBox h={24} />
      <View>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            label='Cor primária'
            placeholder='Digite a cor primária do restaurante (hexadecimal)'
            value={styleFormik.values.primaryColor}
            onChangeText={styleFormik.handleChange('primaryColor')}
            onBlur={styleFormik.handleBlur('primaryColor')}
            style={{ width: '45%' }}
          />
          <SizedBox h={32} />
          <TextInput
            label='Cor de destaque'
            placeholder='Digite a cor primária de destaque do restaurante (hexadecimal)'
            value={styleFormik.values.accentColor}
            onChangeText={styleFormik.handleChange('accentColor')}
            onBlur={styleFormik.handleBlur('accentColor')}
            style={{ width: '45%' }}
          />
        </View>
        <SizedBox h={32} />
        <TextInput
          label='Imagem de capa'
          placeholder='Digite o endereço(url) da imagem de capa'
          value={styleFormik.values.coverImage}
          onChangeText={styleFormik.handleChange('coverImage')}
          onBlur={styleFormik.handleBlur('coverImage')}
          style={{ width: '75%' }}
        />
      </View>

      <SizedBox h={24} />
      <Divider />
      <SizedBox h={24} />
      <Text size='xxxlg'>Funcionamento</Text>
      <SizedBox h={24} />
      <View>
        <FlatList
          data={workingDays}
          renderItem={({ item }) => {
            console.log(operationFormik.values);
            return (
              <View key={item.id}>
                <View style={{ flexDirection: 'row' }}>
                  <Text size='lg'>{item.day}</Text>
                  <SizedBox w={8} />
                  <Switch
                    value={operationFormik.values[item.key].open}
                    onValueChange={(val) => {
                      operationFormik.setFieldValue(
                        `${item.key}.open`,
                        val,
                        true
                      );
                    }}
                  />
                </View>
                <SizedBox h={12} />
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    label='Horário de abertura'
                    placeholder='Digite o horário de abertura do restaurante'
                    value={operationFormik.values[item.key].openingTime}
                    onChangeText={operationFormik.handleChange(
                      `${item.key}.openingTime`
                    )}
                    onBlur={operationFormik.handleBlur(
                      `${item.key}.openingTime`
                    )}
                    disabled={!operationFormik.values[item.key].open}
                    style={{ width: '45%' }}
                  />
                  <SizedBox h={32} />
                  <TextInput
                    label='Horário de fechamento'
                    placeholder='Digite o horário de fechamento do restaurante'
                    value={operationFormik.values[item.key].closingTime}
                    onChangeText={operationFormik.handleChange(
                      `${item.key}.closingTime`
                    )}
                    onBlur={operationFormik.handleBlur(
                      `${item.key}.closingTime`
                    )}
                    disabled={!operationFormik.values[item.key].open}
                    style={{ width: '45%' }}
                  />
                </View>
              </View>
            );
          }}
          ItemSeparatorComponent={() => <SizedBox h={32} />}
        />
        <SizedBox h={32} />
      </View>
    </AppPageWrapper>
  );
}
