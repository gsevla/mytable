import { SizedBox, Text, TextInput } from '@mytable/components';
import { RestaurantWithInfo } from '@mytable/domain';
import { Day } from '@mytable/domain/dist/enums/Day';
import { useFormik } from 'formik';
import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { Switch } from 'react-native-paper';
import { yup } from 'utils/yup';

const dayMap = {
  [Day.MONDAY]: 'Segunda-Feira',
  [Day.TUESDAY]: 'Terça-Feira',
  [Day.WEDNESDAY]: 'Quarta-Feira',
  [Day.THURSDAY]: 'Quinta-Feira',
  [Day.FRIDAY]: 'Sexta-Feira',
  [Day.SATURDAY]: 'Sábado',
  [Day.SUNDAY]: 'Domingo',
};

const createDayValidator = (day: Day) =>
  yup
    .object({
      open: yup.boolean().required().label('Estado de funcionamento'),
      openingTime: yup
        .string()
        .when('open', {
          is: (value) => value,
          then: yup.string().required(),
          otherwise: yup.string(),
        })
        .label('Horário de abertura'),
      closingTime: yup
        .string()
        .when('open', {
          is: (value) => value,
          then: yup.string().required(),
          otherwise: yup.string(),
        })
        .label('Horário de fechamento'),
    })
    .required()
    .label(dayMap[Day.MONDAY]);

const operationSchemaValidation = yup.object().shape({
  [Day.MONDAY]: createDayValidator(Day.MONDAY),
  [Day.TUESDAY]: createDayValidator(Day.TUESDAY),
  [Day.WEDNESDAY]: createDayValidator(Day.WEDNESDAY),
  [Day.THURSDAY]: createDayValidator(Day.THURSDAY),
  [Day.FRIDAY]: createDayValidator(Day.FRIDAY),
  [Day.SATURDAY]: createDayValidator(Day.SATURDAY),
  [Day.SUNDAY]: createDayValidator(Day.SUNDAY),
});

export type RestaurantOperationFormProps = {
  restaurant?: RestaurantWithInfo;
};

export function RestaurantOperationForm({
  restaurant,
}: RestaurantOperationFormProps) {
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

  const operationFormik = useFormik({
    validationSchema: operationSchemaValidation,
    initialValues: operationFormikInitialValues,
    onSubmit: () => {},
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
  });

  return (
    <>
      <Text size='xxxlg'>Funcionamento</Text>
      <SizedBox h={24} />
      <View>
        <FlatList
          data={workingDays}
          renderItem={({ item }) => (
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
                <View style={{ flex: 1 }}>
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
                    error={operationFormik.errors?.[item.key]?.openingTime}
                    touched={operationFormik.touched?.[item.key]?.openingTime}
                    disabled={!operationFormik.values[item.key].open}
                    style={{ width: '75%' }}
                  />
                </View>
                <SizedBox h={32} />
                <View style={{ flex: 1 }}>
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
                    error={operationFormik.errors?.[item.key]?.closingTime}
                    touched={operationFormik.touched?.[item.key]?.closingTime}
                    disabled={!operationFormik.values[item.key].open}
                    style={{ width: '75%' }}
                  />
                </View>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <SizedBox h={32} />}
        />
      </View>
    </>
  );
}
