import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Login from './src/Login';
import Home from './src/Home';
import CryptoDetail from './src/CryptoDetail';

export default function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="List"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Home} />
        <Stack.Screen name="CryptoDetail" component={CryptoDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
