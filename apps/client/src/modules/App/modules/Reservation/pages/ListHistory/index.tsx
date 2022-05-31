import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useContextSelector } from 'use-context-selector';
import { SizedBox } from '../../../../../../components/SizedBox';
import { AppReservationReserveHistoryCardComponent } from '../../components/ReserveCard';
import { ReservationContext } from '../../context';

export function AppReservationListHistoryPage() {
  const reservationsHistory = useContextSelector(
    ReservationContext,
    (values) => values.reservationsHistory
  );

  return (
    <View>
      <FlatList
        data={reservationsHistory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AppReservationReserveHistoryCardComponent reservation={item} />
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
