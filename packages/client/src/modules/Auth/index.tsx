import { parseCookies } from 'nookies';
import React, { useContext } from 'react';
import { AuthContext, AuthContextProvider } from './context';
import { AskForCpfPage } from './pages/AskForCpf';

export function AuthModule(props) {
  console.log('cc', props);

  function Provider({ children }) {
    return (
      <AuthContextProvider selectedStepPage={props?.selectedStepPage}>
        {children}
      </AuthContextProvider>
    );
  }

  function Module() {
    const authContext = useContext(AuthContext);

    return authContext.renderStepPage();
  }

  return (
    <Provider>
      <Module />
    </Provider>
  );
}
