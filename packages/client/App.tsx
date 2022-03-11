import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { AppRoot } from './src';

import './src/services/api';

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs(['Setting a timer']);
  }, []);

  return <AppRoot />;
}
