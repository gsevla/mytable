import React from 'react';
import { RootModule } from './modules/Root';
import { Providers } from '../providers';

export function AppRoot() {
  return (
    <Providers>
      <RootModule />
    </Providers>
  );
}
