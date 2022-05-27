import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Paper } from '../../../../../../components/Paper';

export function AppReservationReserveCardComponent() {
  return (
    <Paper style={styles.container}>
      <Text style={{}}>AppReservationCardComponent</Text>
    </Paper>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    borderRadius: 4,
    height: 96,
  },
});
