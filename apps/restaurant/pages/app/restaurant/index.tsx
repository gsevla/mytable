import { AppPageWrapper } from 'components/AppPageWrapper';
import React from 'react';
import { SizedBox } from '@mytable/components';
import { Divider } from 'react-native-paper';
import { useRestaurantWithInfo } from '#/hooks/api/restaurant/useRestaurantWithInfo';
import { RestaurantInfoForm } from '#/components/Forms/RestaurantInfo';
import { RestaurantStyleForm } from '#/components/Forms/RestaurantStyle';
import { RestaurantOperationForm } from '#/components/Forms/RestaurantOperation';

export default function AppRestaurantPage() {
  const { data: restaurant } = useRestaurantWithInfo();

  return (
    <AppPageWrapper isLoading={false}>
      <RestaurantInfoForm restaurant={restaurant} />

      <SizedBox h={24} />
      <Divider />
      <SizedBox h={24} />

      <RestaurantStyleForm restaurant={restaurant} />

      <SizedBox h={24} />
      <Divider />
      <SizedBox h={24} />

      <RestaurantOperationForm restaurant={restaurant} />

      <SizedBox h={32} />
    </AppPageWrapper>
  );
}
