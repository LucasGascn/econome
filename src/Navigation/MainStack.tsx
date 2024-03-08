import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../Utils/Interfaces';
import CryptoDetail from '../Components/Crypto/CryptoDetail';
import MainTab from './MainTab';
import {getConnected} from '../Utils/AsyncStorage';
import {useState} from 'react';
import Home from '../Home';
import Wallet from '../Wallet';
import SignUp from '../SignUp';
import Login from '../Login';

export default function MainStack(): React.JSX.Element {
  const Stack = createStackNavigator<RootStackParamList>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  getConnected().then(res => {
    setIsLoggedIn(res === 'true');
  });

  if (isLoggedIn) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CryptoDetail" component={CryptoDetail} />
        <Stack.Screen name="Wallet" component={Wallet} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  }
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
