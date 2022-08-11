import React, { useEffect } from 'react';
import LoadingScreen from '~/pages/Loading';
import router from 'next/router';

export default function App() {

  useEffect(() => {
    router.replace('app/dashboard')
  }, [])

  return (
    <LoadingScreen />
  )
}
