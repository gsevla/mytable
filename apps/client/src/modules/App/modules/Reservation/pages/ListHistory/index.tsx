import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SizedBox } from '../../../../../../components/SizedBox';
import { AppReservationReserveCardComponent } from '../../components/ReserveCard';

const items = [
  {
    id: 1,
    label: 'fasf',
  },
  {
    id: 2,
    label: 'fasf',
  },
  {
    id: 3,
    label: 'fasf',
  },
  {
    id: 4,
    label: 'fasf',
  },
  {
    id: 5,
    label: 'fasf',
  },
  {
    id: 6,
    label: 'fasf',
  },
  {
    id: 7,
    label: 'fasf',
  },
];

export function AppReservationListHistoryPage() {
  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return <AppReservationReserveCardComponent />;
        }}
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
