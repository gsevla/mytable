import { AppPageWrapper } from 'components/AppPageWrapper';
import React from 'react';
import { AppReservationTopTab } from './components/ReservationTopTab';

export default function AppReservationOrderPage() {
  return (
    <AppPageWrapper isLoading={false}>
      <AppReservationTopTab />
    </AppPageWrapper>
  );
}
