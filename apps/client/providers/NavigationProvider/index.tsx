import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text } from '@mytable/components';
import { linking } from '~/constants/routes';
import { navigationRef } from '~/services/navigation';

export function NavigationProvider({
  children,
}: {
  children: JSX.Element | React.ReactNode;
}) {
  return (
    <NavigationContainer
      linking={linking}
      fallback={<Text>Loading...</Text>}
      ref={navigationRef}
    >
      {children}
    </NavigationContainer>
  );
}
