import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { SizedBox } from '../../components/SizedBox';
import { AUTHENTICATION_STEPS } from './constants';
import { createContext } from 'use-context-selector';
import { getNavigationState, goBackService } from '../../services/navigation';
import UserReducer from './reducers/user';
import { StorageService } from '../../services';
import { IUser } from '../../../_dos/user';
import { useRouting } from 'expo-next-react-navigation';

export const AuthContext = createContext(
  {} as {
    handleSetActiveStep(_activeStep: keyof typeof AUTHENTICATION_STEPS): void;
    setUserCpf(cpf: IUser['cpf']): void;
    setUserPersonalData(personalData: IUser['personalData']): void;
    setUser(user: Partial<IUser>): void;
    userState: typeof UserReducer.initialState;
  },
);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouting();
  const [activeStep, setActiveStep] = useState<AUTHENTICATION_STEPS>(
    AUTHENTICATION_STEPS.AskForCpfPage,
  );
  const [userState, userDispatch] = useReducer<typeof UserReducer.reducer>(
    UserReducer.reducer,
    UserReducer.initialState,
  );

  const setUserCpf = useCallback((cpf) => {
    userDispatch(UserReducer.actions.setCpf(cpf));
  }, []);

  const setUserPersonalData = useCallback((personalData) => {
    userDispatch(UserReducer.actions.setPersonalData(personalData));
  }, []);

  const setUser = useCallback(
    (user: Partial<typeof UserReducer.initialState>) => {
      userDispatch(UserReducer.actions.setUser(user));
      StorageService.setData({
        key: StorageService.keys.user,
        value: JSON.stringify({ ...userState, ...user }),
      })
        .then(() => {
          console.log('user saved');
        })
        .catch((error) => {
          console.log('error on save user', error);
        });
    },
    [userState],
  );

  const handleSetActiveStep = useCallback(
    (_activeStep: keyof typeof AUTHENTICATION_STEPS) => {
      setActiveStep(AUTHENTICATION_STEPS[_activeStep]);
    },
    [],
  );

  useEffect(() => {
    StorageService.getData({ key: StorageService.keys.user })
      .then((user) => {
        if (user) {
          const _user = JSON.parse(user) as IUser;
          // console.log('## user loaded\n', _user);
          userDispatch(UserReducer.actions.setUser(_user));
          if (_user?.cpf) {
            if (
              _user?.personalData?.name &&
              _user?.personalData?.phone &&
              _user?.personalData?.email
            ) {
              router.replace({
                routeName: 'identification-done',
                web: {
                  path: 'auth/identification/done',
                },
              });
              return;
            }
            router.navigate({
              routeName: 'identification',
              web: {
                path: 'auth/identification',
              },
            });
            return;
          }
        }
      })
      .catch((error) => {
        console.log('error on load user', error);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        handleSetActiveStep,
        setUserCpf,
        setUserPersonalData,
        setUser,
        userState,
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
        <View style={{ height: 72, transform: [{ translateX: -16 }] }}>
          {activeStep === AUTHENTICATION_STEPS.AskForCpfPage ||
          activeStep === AUTHENTICATION_STEPS.AuthorizationCodePage ||
          activeStep === AUTHENTICATION_STEPS.IdentificationDonePage ? null : (
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
