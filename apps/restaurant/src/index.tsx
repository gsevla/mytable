import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import { RootModule } from './modules/Root';

export const AppRoot = () => {
  return (
    <NavigationContainer fallback={<Text>Loading...</Text>}>
      <RootModule />
    </NavigationContainer>
  );
};
