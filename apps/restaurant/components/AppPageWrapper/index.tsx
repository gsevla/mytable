import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { SizedBox } from '~/components/SizedBox';
import router from 'next/router';

interface IAppPageWrapper {
  children: React.ReactNode;
}

export const AppPageWrapper = ({ children }: IAppPageWrapper) => {
  return (
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
            <Button
              mode='text'
              onPress={() => {
                router.push('/app/dashboard');
              }}
            >
              Dashboard
            </Button>
          </View>
          <SizedBox />
          <View>
            <Button
              mode='text'
              onPress={() => {
                router.push('/app/reservation-order');
              }}
            >
              Ordens de Reserva
            </Button>
          </View>
          <SizedBox />
          <View>
            <Button
              mode='text'
              onPress={() => {
                router.push('/app/waiting-line');
              }}
            >
              Fila de Espera
            </Button>
          </View>
          <SizedBox />
          <View>
            <Button
              mode='text'
              onPress={() => {
                router.push('/app/restaurant');
              }}
            >
              Restaurante
            </Button>
          </View>
          <SizedBox />
          <View>
            <Button
              mode='text'
              onPress={() => {
                router.push('/app/employee');
              }}
            >
              Funcionários
            </Button>
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
  );
};
