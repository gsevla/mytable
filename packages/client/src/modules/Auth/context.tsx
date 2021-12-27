import React, { createContext, useCallback, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { AskForCpfPage } from './pages/AskForCpf';
import { AuthorizationCodePage } from './pages/AuthorizationCode';
import { ForgotPasswordPage } from './pages/ForgotPassword';
import { IdentificationPage } from './pages/Identification';
import { IdentificationDonePage } from './pages/IdentificationDone';
import { setCookie, parseCookies } from 'nookies';
import { FAB } from 'react-native-paper';

export const AuthContext = createContext(
  {} as {
    step: number;
    setStep(_step: number): void;
    renderStepPage(): React.ReactElement;
  },
);

export function AuthContextProvider({ children, selectedStepPage }) {
  const [step, setStep] = useState(selectedStepPage || 0);

  const renderStepPage = useCallback(() => {
    const stepPages = {
      0: <AskForCpfPage />,
      1: <IdentificationPage />,
      2: <IdentificationDonePage />,
      3: <ForgotPasswordPage />,
      4: <AuthorizationCodePage />,
    };

    return stepPages[step];
  }, [step]);

  const _setStep = (_step: number) => {
    setCookie(null, 'AUTH_STEP', _step.toString(), {
      maxAge: 60 * 60, // 1h,
      path: '/auth',
    });
    setStep(_step);
  };

  return (
    <AuthContext.Provider value={{ step, setStep: _setStep, renderStepPage }}>
      <View style={{ height: 72 }}>
        {step > 0 && (
          <FAB
            style={styles.fab}
            small
            icon="arrow-left"
            onPress={() => {
              _setStep(step - 1);
            }}
          />
        )}
      </View>
      <Image
        source={require('../../../assets/logoDefault.png')}
        resizeMode="contain"
        style={{
          width: '75%',
          height: '25%',
          alignSelf: 'center',
        }}
      />
      <View style={{ marginHorizontal: 16, marginVertical: 16, flex: 1 }}>
        {children}
      </View>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 16,
  },
});
