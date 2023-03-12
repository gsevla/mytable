// @generated: @expo/next-adapter@3.1.0
import React, { useEffect } from 'react';
import router from 'next/router';
import LoadingScreen from '../src/pages/Loading';

export default function App() {
  async function replaceRouteToApp() {
    await router.replace('app');
  }

  useEffect(() => {
    replaceRouteToApp();
  }, []);

  return <LoadingScreen />;
}
