import React, { createContext, useCallback, useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AskForCpfPage } from './pages/AskForCpf';
import { AuthorizationCodePage } from './pages/AuthorizationCode';
import { ForgotPasswordPage } from './pages/ForgotPassword';
import { IdentificationPage } from './pages/Identification';
import { IdentificationDonePage } from './pages/IdentificationDone';
import { setCookie, parseCookies } from 'nookies';
import { FAB } from 'react-native-paper';
// import { useRouter } from 'next/router';
import { useRouting } from 'expo-next-react-navigation';

export const AuthContext = createContext(
  {} as {
    // step: number;
    // setStep(_step: number): void;
    // renderStepPage(): React.ReactElement;
  },
);

export function AuthContextProvider({ children }) {
  // const router = useRouting();
  // console.log('router', router);
  // const [step, setStep] = useState(0);

  const [isBackButtonVisible, setIsBackButtonVisible] = useState(false);
  const [activeRouteName, setActiveRouteName] = useState();

  // const renderStepPage = useCallback(() => {
  //   const stepPages = {
  //     0: <AskForCpfPage />,
  //     1: <IdentificationPage />,
  //     2: <IdentificationDonePage />,
  //     3: <ForgotPasswordPage />,
  //     4: <AuthorizationCodePage />,
  //   };

  //   return stepPages[step];
  // }, [step]);

  // const _setStep = (_step: number) => {
  //   setCookie(null, 'AUTH_STEP', _step.toString(), {
  //     maxAge: 60 * 60, // 1h,
  //     path: '/auth',
  //   });
  //   setStep(_step);
  // };

  return (
    <AuthContext.Provider
      value={{
        isBackButtonVisible,
        setIsBackButtonVisible,
        setActiveRouteName,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: '#eeeeee',
          paddingHorizontal: 16,
          paddingVertical: 24,
        }}
      >
        <View style={{ height: 72 }}>
          {isBackButtonVisible && (
            <FAB
              style={styles.fab}
              small
              icon="arrow-left"
              onPress={() => {
                // onBackPress();
              }}
              // onPress={() => {
              //   // _setStep(step - 1);
              //   // router.goBack();
              // }}
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
        {/* <View style={{ flex: 1, backgroundColor: '#eeeeee' }}>
        <View style={{ height: 72 }}>
          {router.pathname !== '/auth' && (
            <FAB
              style={styles.fab}
              small
              icon="arrow-left"
              onPress={() => {
                // _setStep(step - 1);
                router.goBack();
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
        <View
          style={{
            marginHorizontal: 16,
            marginVertical: 24,
            flex: 1,
          }}
        >
          {children}
        </View>
      </View> */}
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
