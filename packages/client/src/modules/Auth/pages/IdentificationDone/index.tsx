import { useRouting } from 'expo-next-react-navigation';
import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useContextSelector } from 'use-context-selector';
import { AuthContext } from '../../context';
import { Headline, Subheading, Text } from 'react-native-paper';
import { SizedBox } from '../../../../components/SizedBox';

export function IdentificationDonePage() {
  const handleSetActiveStep = useContextSelector(
    AuthContext,
    (values) => values.handleSetActiveStep,
  );
  useEffect(() => {
    handleSetActiveStep('IdentificationDonePage');
  }, []);

  const router = useRouting();

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#eeeeee',
        paddingHorizontal: 24,
        justifyContent: 'space-between',
      }}
    >
      <Headline style={{ textAlign: 'center' }}>
        Olá,{'\n'}
        <Headline>Fulano de Tal!</Headline>
      </Headline>
      <SizedBox h={16} />
      <Headline style={{ textAlign: 'center' }}>Verificamos que</Headline>
      <SizedBox h={16} />
      <Subheading style={{ textAlign: 'center' }}>
        Seu telefone é:{'\n'}
        <Text>93812039180</Text>
      </Subheading>
      <SizedBox h={8} />
      <Subheading style={{ textAlign: 'center' }}>
        Seu email é:{'\n'}
        <Text>gasgdassags</Text>
      </Subheading>
      <View>
        <SizedBox h={32} />
        <Button
          mode="text"
          onPress={() => {
            router.navigate({
              routeName: 'auth/forgot-password',
            });
          }}
        >
          Não possuo mais acesso
        </Button>
        <SizedBox h={24} />
        <Button
          mode="contained"
          onPress={() => {
            router.navigate({
              routeName: 'auth/code',
            });
          }}
        >
          Avançar
        </Button>
      </View>
    </ScrollView>
  );
}
