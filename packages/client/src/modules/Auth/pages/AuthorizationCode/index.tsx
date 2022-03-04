import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { useContextSelector } from 'use-context-selector';
import { SizedBox } from '../../../../components/SizedBox';
import { AuthContext } from '../../context';
import { Headline, Subheading } from 'react-native-paper';
import { useFocusEffect } from 'expo-next-react-navigation';
import { ApiService, StorageService } from '../../../../services';
import { transformUserIntoClient } from '../../../../../_dos/user';
import { RootContext } from '../../../Root/context';

const resentTimeInM = 5 * 60; // 5 minutes
const resentTimeInMs = 60 * 5 * 1000; // 5 minutes in ms
const timeUpdateInterval = 1000; // 1 second in ms

// WIP: atualizar o resent time de acordo com o app state
export function AuthorizationCodePage({ navigation, route }) {
  const { params } = route;
  const handleSetActiveStep = useContextSelector(
    AuthContext,
    (values) => values.handleSetActiveStep,
  );

  const userState = useContextSelector(
    AuthContext,
    (values) => values.userState,
  );
  const client = transformUserIntoClient(userState);

  const persistUserToken = useContextSelector(
    AuthContext,
    (values) => values.persistUserToken,
  );

  const setToken = useContextSelector(RootContext, (values) => values.setToken);

  useFocusEffect(
    useCallback(() => {
      handleSetActiveStep('AuthorizationCodePage');
    }, [handleSetActiveStep]),
  );

  useEffect(() => {
    console.log('token', params?.token);
    if (params?.token) {
      // persistUserToken(params.token);
      setToken(params.token);
    }
  }, [params?.token]);

  const [sentTime, setSentTime] = useState<number>();
  const [remainingTime, setRemainingTime] = useState(0);
  const [_interval, _setInterval] = useState<NodeJS.Timer>();

  async function handleSent() {
    const _codeSentTime = Date.now();
    setSentTime(_codeSentTime);
    const codeResentTime = _codeSentTime + resentTimeInMs;
    setRemainingTime(resentTimeInM);
    const interval = setInterval(async () => {
      setRemainingTime((old) => old - 1);
      if (Date.now() > codeResentTime) {
        await StorageService.setData({
          key: 'shouldNotSendCodeAutomatically',
          value: 'true',
        });
        setRemainingTime(0);
        clearInterval(interval);
      }
    }, timeUpdateInterval);
    _setInterval(interval);
    await ApiService.auth.signInClient(client);
    await StorageService.setData({
      key: StorageService.keys.codeSentTime,
      value: JSON.stringify(_codeSentTime),
    });
    await StorageService.setData({
      key: StorageService.keys.codeResentTime,
      value: JSON.stringify(codeResentTime),
    });
  }

  async function handleResent() {
    const codeSentTime = parseInt(
      (await StorageService.getData({
        key: StorageService.keys.codeSentTime,
      })) as string,
      10,
    );
    setSentTime(codeSentTime);
    const codeResentTime = parseInt(
      (await StorageService.getData({
        key: StorageService.keys.codeResentTime,
      })) as string,
      10,
    );
    if (Date.now() < codeResentTime) {
      const _remainingTime = Math.trunc((codeResentTime - Date.now()) / 1000);
      setRemainingTime(_remainingTime);
      const interval = setInterval(async () => {
        setRemainingTime((old) => old - 1);
        if (Date.now() > codeResentTime) {
          await StorageService.setData({
            key: 'shouldNotSendCodeAutomatically',
            value: 'true',
          });
          setRemainingTime(0);
          clearInterval(interval);
        }
      }, timeUpdateInterval);
      _setInterval(interval);
    }
  }

  useEffect(() => {
    if (params?.shouldSendCode) {
      handleSent();
    } else {
      handleResent();
    }
    return () => {
      clearInterval(_interval);
    };
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        backgroundColor: '#eeeeee',
      }}
    >
      <Headline>Email enviado!</Headline>
      <Subheading>
        Verifique sua caixa de entrada para prosseguir com a autenticação.
      </Subheading>
      <View>
        <SizedBox h={32} />
        <Button
          mode="text"
          disabled={!!sentTime && remainingTime > 0}
          onPress={async () => {
            await handleSent();
          }}
        >
          Reenviar código
        </Button>
        <HelperText
          type="info"
          style={{ textAlign: 'center' }}
          visible={!!sentTime && remainingTime > 0}
        >
          {remainingTime} segundos
        </HelperText>
      </View>
    </ScrollView>
  );
}
