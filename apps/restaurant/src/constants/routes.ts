import * as Linking from 'expo-linking';

export const routes = {
  app: {
    'dashboard': {
      web: 'app/dashboard',
      mobile: 'dashboard',
    },
    'reservation-order': {
      web: 'app/reservation-order',
      mobile: 'reservation-order',
    },
    'waiting-queue': {
      web: 'app/waiting-queue',
      mobile: 'waiting-queue',
    },
  },
} as const;

const prefix = Linking.createURL('/');

const config = {
  screens: {
    app: {
      screens: {
        [routes.app.dashboard.mobile]: routes.app.dashboard.web,
        [routes.app['reservation-order'].mobile]: routes.app['reservation-order'].web,
        [routes.app['waiting-queue'].mobile]: routes.app['waiting-queue'].web,
      },
    },
  },
} as const;

export const linking = {
  prefixes: [prefix],
  config,
};
