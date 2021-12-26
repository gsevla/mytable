import React, { useContext } from 'react';
import { AuthContext, AuthContextProvider } from './context';
import { AskForCpfPage } from './pages/AskForCpf';

export function AuthModule() {
  function Provider({ children }) {
    return <AuthContextProvider>{children}</AuthContextProvider>;
  }

  function Module() {
    const a = useContext(AuthContext);

    console.log('aa', a);
    return a.renderStepPage();
  }

  return (
    <Provider>
      <Module />
    </Provider>
  );
}
