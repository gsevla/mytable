import { AppPageWrapper } from 'components/AppPageWrapper';
import React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { ActiveReservationTab } from './components/ActiveReservationTab';
import { ReservationHistoryTab } from './components/ReservationHistoryTab';

export default function AppReservationOrderPage() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'activeReservation', title: 'Em andamento' },
    { key: 'reservationHistory', title: 'Histórico' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    activeReservation: ActiveReservationTab,
    reservationHistory: ReservationHistoryTab,
  });

  return (
    <AppPageWrapper isLoading={false}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </AppPageWrapper>
  );
}
