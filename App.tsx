import React, { useCallback } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Crypto } from "./src/interfaces.tsx";
// import Login from './src/Login';
import Home from './src/Home';
import CryptoDetail from './src/CryptoDetail';
import { Provider } from 'react-redux';
import {store} from './src/stores/store.tsx'

export default function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator
          initialRouteName="List"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Home} />
          <Stack.Screen name="CryptoDetail" component={CryptoDetail} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
