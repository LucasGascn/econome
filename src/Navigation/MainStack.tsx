import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../Utils/Interfaces';
import CryptoDetail from '../Components/Crypto/CryptoDetail';
import MainTab from './MainTab';

export default function MainStack(): React.JSX.Element {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="MainTab">
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="CryptoDetail" component={CryptoDetail} />
    </Stack.Navigator>
  );
}
