import React, { useCallback } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import Login from './src/Login.tsx';
import { Crypto } from "./src/interfaces.tsx";

export default function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  const {cryptos} = useSelector((s: any) => {return s.cryptos})
  const dispatch = useDispatch();

  const setCryptos = useCallback(() => {

  }, cryptos);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
