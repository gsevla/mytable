import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { AppState, StyleSheet, Text, View } from 'react-native';
import { AppRoot } from './src';
import * as Linking from 'expo-linking';
import { navigateService } from './src/services/navigation';
import './src/services/api';

export default function App() {
  // const appState = useRef(AppState.currentState);
  // const [appStateVisible, setAppStateVisible] = useState(appState.current);

  // useEffect(() => {
  //   AppState.addEventListener('change', _handleAppStateChange);

  //   return () => {
  //     AppState.removeEventListener('change', _handleAppStateChange);
  //   };
  // }, []);

  // const _handleAppStateChange = (nextAppState) => {
  //   if (
  //     appState.current.match(/inactive|background/) &&
  //     nextAppState === 'active'
  //   ) {
  //     console.log('App has come to the foreground!');
  //   }

  //   appState.current = nextAppState;
  //   setAppStateVisible(appState.current);
  //   console.log('AppState', appState.current);
  // };

  // function handleDeepLink(event: Linking.EventType) {
  //   let data = Linking.parse(event.url);
  //   // Linking.openURL('exp://127.0.0.1:19000/--/authorization');
  //   console.log('data', data);
  //   navigateService(data.path, data.queryParams);
  // }

  // useEffect(() => {
  //   Linking.getInitialURL().then(
  //     (value) => {
  //       console.log('initialUrl', value);
  //       if (value) {
  //         let data = Linking.parse(value);
  //         console.log('data', data);
  //         navigateService(data.path, data.queryParams);
  //       }
  //     },
  //     (error) => {
  //       console.log('err', error);
  //     },
  //   );
  // }, []);

  // useEffect(() => {
  //   Linking.addEventListener('url', handleDeepLink);

  //   return () => {
  //     Linking.removeEventListener('url');
  //   };
  // }, []);

  return <AppRoot />;
}
