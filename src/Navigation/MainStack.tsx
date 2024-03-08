import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../Utils/Interfaces';
import Home from '../Home';
import CryptoDetail from '../Components/Crypto/CryptoDetail';
import Wallet from '../Wallet';
import Login from '../Login';
import SignUp from '../SignUp';

export default function MainStack(): React.JSX.Element {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CryptoDetail" component={CryptoDetail} />
      <Stack.Screen name="Wallet" component={Wallet} />
    </Stack.Navigator>
  );
}
