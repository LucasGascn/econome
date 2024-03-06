/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CryptoDetail from './src/CryptoDetail';
import Home from './src/Home';
import {Icon} from '@rneui/base';

export type RootStackParamList = {
  MainStack: undefined;
  Home: undefined;
  CryptoDetail: {id: string};
};

export default function App(): React.JSX.Element {
  const Stack = createStackNavigator<RootStackParamList>();
  const Tab = createBottomTabNavigator<RootStackParamList>();

  const MainStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CryptoDetail" component={CryptoDetail} />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {backgroundColor: '#1B0B49', borderColor: '#1B0B49'},
        }}>
        <Tab.Screen
          name="MainStack"
          component={MainStack}
          options={{
            tabBarIcon: () => {
              return <Icon name={'home'} color={'#EBE7F5'} />;
            },
            tabBarLabel: () => {
              return null;
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
