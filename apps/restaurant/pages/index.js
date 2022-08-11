// @generated: @expo/next-adapter@3.1.0
import React, { useEffect } from 'react';
import LoadingScreen from '../src/pages/Loading';
import router from 'next/router';

export default function App() {

  useEffect(() => {
    router.replace('app')
  }, [])

  return <LoadingScreen />;
}
