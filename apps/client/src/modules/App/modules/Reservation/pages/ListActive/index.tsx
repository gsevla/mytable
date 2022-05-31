import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useContextSelector } from 'use-context-selector';
import { SizedBox } from '../../../../../../components/SizedBox';
import { AppReservationReserveActiveCardComponent } from '../../components/ReserveCard';
import { ReservationContext } from '../../context';

export function AppReservationListActivePage() {
  const reservations = useContextSelector(
    ReservationContext,
    (values) => values.reservations
  );

  return (
    <View>
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AppReservationReserveActiveCardComponent reservation={item} />
        )}
        ItemSeparatorComponent={SizedBox}
        contentContainerStyle={{ flexGrow: 1, padding: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
