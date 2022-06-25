import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { ReservationContextProvider } from './context';
import { AppReservationStack } from './navigation';
import { navigate, getCurrentRoute } from '~/services/navigation';
import { routes } from '~/constants/routes';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});

export function Reservation() {
  const currentRoute = getCurrentRoute();

  return (
    <ReservationContextProvider>
      <AppReservationStack />
      <FAB
        icon='plus'
        small
        visible={
          currentRoute?.name !== routes.app.reservation.reserve.mobile &&
          currentRoute?.name !== routes.app.reservation.reserve.web
        }
        style={styles.fab}
        onPress={() => {
          navigate(routes.app.reservation.reserve.mobile);
        }}
      />
    </ReservationContextProvider>
  );
}
