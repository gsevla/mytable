import { createNavigationContainerRef } from '@react-navigation/native';
import Router from 'next/router';
import { Platform } from 'react-native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params?: Record<string, unknown>) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}

export function goBack() {
  if (Platform.OS === 'web') {
    Router.back();
  } else if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

export function getState() {
  if (navigationRef.isReady()) {
    return navigationRef.getState();
  }
  return null;
}

export function isFocused() {
  if (navigationRef.isReady()) {
    return navigationRef.isFocused();
  }
  return null;
}

export function getCurrentRoute() {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute();
  }
  return null;
}
