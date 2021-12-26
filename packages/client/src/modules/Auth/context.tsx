import React, { createContext, useCallback, useState } from 'react';
import { AskForCpfPage } from './pages/AskForCpf';
import { IdentificationPage } from './pages/Identification';

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const [step, setStep] = useState(0);

  const renderStepPage = useCallback(() => {
    const stepPages = {
      0: <AskForCpfPage />,
      1: <IdentificationPage />,
    };

    return stepPages[step];
  }, [step]);

  return (
    <AuthContext.Provider value={{ step, setStep, renderStepPage }}>
      {children}
    </AuthContext.Provider>
  );
}
