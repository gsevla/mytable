import React, { useCallback, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { SizedBox } from '../../components/SizedBox';
import { AUTHENTICATION_STEPS } from './constants';
import { createContext } from 'use-context-selector';
import { goBackService } from '../../services/navigation';

export const AuthContext = createContext(
  {} as {
    handleSetActiveStep(_activeStep: keyof typeof AUTHENTICATION_STEPS): void;
  },
);

export function AuthContextProvider({ children }) {
  const [activeStep, setActiveStep] = useState<AUTHENTICATION_STEPS>(
    AUTHENTICATION_STEPS.AskForCpfPage,
  );

  const handleSetActiveStep = useCallback(
    (_activeStep: keyof typeof AUTHENTICATION_STEPS) => {
      setActiveStep(AUTHENTICATION_STEPS[_activeStep]);
    },
    [],
  );

  return (
    <AuthContext.Provider
      value={{
        handleSetActiveStep,
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
          {activeStep !== AUTHENTICATION_STEPS.AskForCpfPage && (
            <FAB
              style={styles.fab}
              small
              icon="arrow-left"
              onPress={() => {
                goBackService();
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
        <SizedBox h={32} />
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
