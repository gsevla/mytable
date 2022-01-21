import React, { useContext } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { AuthContext } from '../../context';
import { useRouting } from 'expo-next-react-navigation';
import { SizedBox } from '../../../../components/SizedBox';

export function AskForCpfPage() {
  // const authContext = useContext(AuthContext);
  const router = useRouting();

  const [text, setText] = React.useState('');

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {/* <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
      }}
    > */}
      <TextInput
        label="CPF"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <SizedBox h={48} />
      <Button
        mode="contained"
        onPress={() => {
          // router.push('IdentificationPage');
          router.navigate({
            routeName: 'identification',
            web: { as: '/auth/identification' },
          });
          // authContext.setStep(1);
          // router.push('/auth/identification');
        }}
      >
        Avançar
      </Button>
    </View>
  );
}
