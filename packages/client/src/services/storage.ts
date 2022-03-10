import Nookies from 'nookies';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const keys = {
  user: 'user', // used before authentication
  client: 'client', // used after authentication
  restaurant: 'restaurant',
  codeSentTime: 'codeSentTime',
  codeResentTime: 'codeResentTime',
  shouldNotSendCodeAutomatically: 'shouldNotSendCodeAutomatically',
  token: 'token',
} as const;

async function setData({
  key,
  value,
  ctx = null,
  options = undefined,
}: {
  key: keyof typeof keys;
  value: string;
  ctx?: Parameters<typeof Nookies.set>[0];
  options?: Parameters<typeof Nookies.set>[3];
}) {
  if (Platform.OS === 'web') {
    Nookies.set(ctx, key, value, options);
  } else {
    await AsyncStorage.setItem(key, value);
  }
}

async function getData({
  key,
  ctx = null,
  options = undefined,
}: {
  key: keyof typeof keys;
  ctx?: Parameters<typeof Nookies.get>[0];
  options?: Parameters<typeof Nookies.get>[1];
}) {
  let data;
  if (Platform.OS === 'web') {
    data = Nookies.get(ctx, options)[key];
  } else {
    data = await AsyncStorage.getItem(key);
  }
  return data;
}

function destroyData({
  key,
  ctx,
  options,
}: {
  key: keyof typeof keys;
  ctx?: Parameters<typeof Nookies.destroy>[0];
  options?: Parameters<typeof Nookies.destroy>[2];
}) {
  if (Platform.OS === 'web') {
    Nookies.destroy(ctx, key, options);
  } else {
    AsyncStorage.removeItem(key);
  }
}

export default {
  keys,
  setData,
  getData,
  destroyData,
};
