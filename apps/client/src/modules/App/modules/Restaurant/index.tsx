import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Headline, Title, Subheading } from 'react-native-paper';
import { Day } from '@mytable/domain';
import { SizedBox } from '../../../../components/SizedBox';
import { AppRestaurantEnvironmentSectionComponent } from './components/EnvironmentSection';
import { useRestaurantWithInfo } from '#hooks/api/restaurant/useRestaurantWithInfo';

const dayMap = {
  [Day.MONDAY]: 'Segunda-Feira',
  [Day.TUESDAY]: 'Terça-Feira',
  [Day.WEDNESDAY]: 'Quarta-Feira',
  [Day.THURSDAY]: 'Quinta-Feira',
  [Day.FRIDAY]: 'Sexta-Feira',
  [Day.SATURDAY]: 'Sábado',
  [Day.SUNDAY]: 'Domingo',
};

export function Restaurant() {
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
        time: workingDay.open
          ? `${workingDay.openingTime} - ${workingDay.closingTime}`
          : 'Fechado',
      };
    });
  }, [restaurant]);

  const WorkingDaysSection = useMemo(
    () =>
      workingDays.reduce(
        (accu, item) => {
          accu.days.push(
            React.createElement(
              Subheading,
              {
                key: `working-day-${item.id}`,
              },
              item.day
            )
          );
          accu.times.push(
            React.createElement(
              Subheading,
              {
                key: `working-time-${item.id}`,
              },
              item.time
            )
          );

          return accu;
        },
        {
          days: [],
          times: [],
        }
      ),
    [workingDays]
  );

  const environments = useMemo(() => {
    if (!restaurant) return [];

    return restaurant.environments.map((environment) => ({
      id: environment.id,
      title: environment.name,
      description: environment.description,
      images: environment.images.map((image) => ({
        id: image.id,
        source: image.addr,
      })),
    }));
  }, [restaurant]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Headline>
        Aqui você encontra informações a respeito do restaurante
      </Headline>

      <SizedBox h={24} />

      <Title>Funcionamento</Title>
      <View style={styles.workingTimeContainer}>
        <View>{WorkingDaysSection.days}</View>
        <SizedBox />
        <View>{WorkingDaysSection.times}</View>
      </View>

      <SizedBox h={24} />

      <Title>Espaços</Title>
      {environments.map((item, index, arr) => (
        <React.Fragment key={item.id.toString()}>
          <AppRestaurantEnvironmentSectionComponent
            title={item.title}
            description={item.description}
            images={item?.images}
          />
          {index < arr.length - 1 && <SizedBox />}
        </React.Fragment>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  workingTimeContainer: {
    flexDirection: 'row',
  },
});
