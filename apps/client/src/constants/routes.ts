import * as Linking from 'expo-linking';

export const routes = {
  auth: {
    'ask-for-cpf': {
      web: 'auth/ask-for-cpf',
      mobile: 'ask-for-cpf',
    },
    identification: {
      web: 'auth/identification',
      mobile: 'identification',
    },
    'forgot-password': {
      web: 'auth/forgot-password',
      mobile: 'forgot-password',
    },
    'identification-done': {
      web: 'auth/identification-done',
      mobile: 'identification-done',
    },
    code: {
      web: 'auth/code',
      mobile: 'code',
    },
    authorization: {
      web: 'auth/authorization',
      mobile: 'authorization',
    },
  },
  app: {
    restaurant: {
      web: 'app/restaurant',
      mobile: 'restaurant',
    },
    reservation: {
      list: {
        web: 'app/reservation/list',
        mobile: 'reservation-list',
      },
      reserve: {
        web: 'app/reservation/reserve',
        mobile: 'reservation-reserve',
      },
    },
    'waiting-line': {
      web: 'app/waiting-line',
      mobile: 'waiting-line',
    },
    identification: {
      qr: {
        web: 'app/identification/qr',
        mobile: 'qr',
      },
      waiting: {
        web: 'app/identification/waiting',
        mobile: 'waiting',
      },
      'your-turn': {
        web: 'app/identification/your-turn',
        mobile: 'your-turn',
      },
      'loose-your-turn': {
        web: 'app/identification/loose-your-turn',
        mobile: 'loose-your-turn',
      },
    },
  },
} as const;

const prefix = Linking.createURL('/');

const config = {
  screens: {
    auth: {
      screens: {
        [routes.auth['ask-for-cpf'].mobile]: routes.auth['ask-for-cpf'].web,
        [routes.auth.identification.mobile]: routes.auth.identification.web,
        [routes.auth['forgot-password'].mobile]:
          routes.auth['forgot-password'].web,
        [routes.auth['identification-done'].mobile]:
          routes.auth['identification-done'].web,
        [routes.auth.code.mobile]: routes.auth.code.web,
        [routes.auth.authorization.mobile]: routes.auth.authorization.web,
      },
    },
    app: {
      screens: {
        [routes.app.restaurant.mobile]: routes.app.restaurant.web,
        reservation: {
          screens: {
            [routes.app.reservation.list.mobile]:
              routes.app.reservation.list.web,
            [routes.app.reservation.reserve.mobile]:
              routes.app.reservation.reserve.web,
          },
        },
        [routes.app['waiting-line'].mobile]: routes.app['waiting-line'].web,
        identification: {
          screens: {
            [routes.app.identification.qr.mobile]:
              routes.app.identification.qr.web,
            [routes.app.identification.waiting.mobile]:
              routes.app.identification.waiting.web,
            [routes.app.identification['your-turn'].mobile]:
              routes.app.identification['your-turn'].web,
            [routes.app.identification['loose-your-turn'].mobile]:
              routes.app.identification['loose-your-turn'].web,
          },
        },
      },
    },
  },
} as const;

export const linking = {
  prefixes: [prefix],
  config,
};
