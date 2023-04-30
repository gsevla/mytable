import * as Linking from 'expo-linking';

export const routes = {
  app: {
    dashboard: {
      web: 'app/dashboard',
      mobile: 'dashboard',
    },
    'reservation-order': {
      active: {
        web: 'app/reservation-order/active',
        mobile: 'reservation-order-active',
      },
      history: {
        web: 'app/reservation-order/history',
        mobile: 'reservation-order-history',
      },
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
        'reservation-order': {
          screens: {
            [routes.app['reservation-order'].active.mobile]:
              routes.app['reservation-order'].active.web,
            [routes.app['reservation-order'].history.mobile]:
              routes.app['reservation-order'].history.web,
          },
        },
        [routes.app['waiting-queue'].mobile]: routes.app['waiting-queue'].web,
      },
    },
  },
} as const;

export const linking = {
  prefixes: [prefix],
  config,
};
