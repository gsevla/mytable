import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContextSelector } from 'use-context-selector';
import AppModule from '~/modules/App';
import LoadingScreen from '~/pages/Loading';
import { RootContext } from '../contex';

const RootStackNavigator = createNativeStackNavigator()

export default function RootStack() {
  const loading = useContextSelector(RootContext, (values) => values.loading)
  if(loading) {
    return <LoadingScreen />
  }

  return (
    <RootStackNavigator.Navigator>
      <RootStackNavigator.Screen name="app" component={AppModule} />
    </RootStackNavigator.Navigator>
  )
}
