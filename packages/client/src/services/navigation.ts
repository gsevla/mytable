import { createNavigationContainerRef } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import Router from 'next/router';
import { Platform } from 'react-native';

export const navigationRef = createNavigationContainerRef();

export function navigateService(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function goBackService() {
  if (Platform.OS === 'web') {
    Router.back();
  } else {
    if (navigationRef.isReady()) {
      navigationRef.goBack();
    }
  }
}

export function getNavigationState() {
  if (navigationRef.isReady()) {
    // return navigationRef.canGoBack();
    return navigationRef.getState();
  }
}
