import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { AppRoot } from './src';

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs(['Setting a timer']);
  }, []);

  return <AppRoot />;
}
