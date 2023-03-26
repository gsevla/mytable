import React from 'react';
import { createContext } from 'use-context-selector';
import { View } from 'react-native';
import { Button, Headline, Text } from 'react-native-paper';
import { SizedBox } from 'components/SizedBox';

interface IAppContextProvider {
  children: React.ReactNode;
}

interface IAppContextValues {}

export const AppContext = createContext({} as IAppContextValues);

export function AppContextProvider({ children }: IAppContextProvider) {
  return (
    <AppContext.Provider value={{}}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View
          style={{
            flex: 0.2,
            borderRightWidth: 1,
            borderRightColor: '#ccc',
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            padding: 16,

            shadowColor: '#000',
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            justifyContent: 'space-between',
          }}
        >
          <View>
            <View>
              <Button mode='text'>Dashboard</Button>
            </View>
            <SizedBox />
            <View>
              <Button mode='text'>Reserva</Button>
            </View>
            <SizedBox />
            <View>
              <Button mode='text'>Restaurante</Button>
            </View>
            <SizedBox />
            <View>
              <Button mode='text'>Ambientes</Button>
            </View>
            <SizedBox />
            <View>
              <Button mode='text'>Funcionários</Button>
            </View>
          </View>
          <View>
            <Button mode='text'>Sair</Button>
          </View>
        </View>
        <View
          style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center' }}
        >
          <View
            style={{
              height: '90%',
              width: '90%',
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 8,
              shadowColor: '#000',
              shadowOffset: {
                width: 2,
                height: 2,
              },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              padding: 16,
            }}
          >
            {children}
          </View>
        </View>
      </View>
    </AppContext.Provider>
  );
}
