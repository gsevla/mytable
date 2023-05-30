import Nookies, { parseCookies } from 'nookies';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

type CookiesRequiredArgs = {
  ctx: unknown;
  options?: Record<string, unknown>;
};

type SetDataArgs = {} & CookiesRequiredArgs;

type GetDataArgs = {} & CookiesRequiredArgs;

type DestroyDataArgs = {} & CookiesRequiredArgs;

export function createStorageService<T = Record<string, unknown>>(keys: T) {
  async function setData(
    key: string,
    value: string,
    { ctx = null, options = {} }: SetDataArgs = {} as SetDataArgs
  ) {
    if (Platform.OS === 'web') {
      Nookies.set(ctx, key, value, {
        path: '/',
        ...options,
      });
    } else {
      await AsyncStorage.setItem(key, value);
    }
  }

  async function getData<TData = string | Record<string, unknown>>(
    key: string,
    { ctx = null, options }: GetDataArgs = {} as GetDataArgs
  ): Promise<TData | null> {
    let data;

    if (Platform.OS === 'web') {
      if (ctx === null) {
        // means client cookies
        data = parseCookies()[keys[key]];
      } else {
        data = Nookies.get(ctx, options)?.[key];
      }
    } else {
      data = await AsyncStorage.getItem(key);
    }

    if (!data || Object.keys(data).length === 0) return null;

    try {
      return JSON.parse(data);
    } catch (error) {
      // data is a string
      return data;
    }
  }

  async function destroyData(
    key: string,
    { ctx = null, options = {} }: DestroyDataArgs = {} as DestroyDataArgs
  ) {
    if (Platform.OS === 'web') {
      Nookies.destroy(ctx, key, {
        path: '/',
        ...options,
      });
    } else {
      await AsyncStorage.removeItem(key);
    }
  }

  return {
    setData,
    getData,
    destroyData,
  };
}
