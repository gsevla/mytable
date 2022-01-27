import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { AuthContext } from '../../context';
import { useRouting } from 'expo-next-react-navigation';
import { SizedBox } from '../../../../components/SizedBox';

export function AskForCpfPage() {
  const authContext = useContext(AuthContext);
  const router = useRouting();

  const [text, setText] = React.useState('');

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#eeeeee',
        paddingHorizontal: 24,
      }}
    >
      <TextInput
        label="CPF"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <SizedBox h={48} />
      <Button
        mode="contained"
        onPress={() => {
          router.navigate({
            routeName: 'auth/identification',
          });
          // authContext.setIsBackButtonVisible(true);
        }}
      >
        Avançar
      </Button>
    </View>
  );
}
