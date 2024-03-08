/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from '../Utils/Interfaces';
import {Icon} from '@rneui/base';
import Wallet from '../Wallet';
import Home from '../Home';

export default function MainTab(): React.JSX.Element {
  const Tab = createBottomTabNavigator<RootStackParamList>();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: '#1B0B49', borderColor: '#1B0B49'},
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => {
            return <Icon name={'home'} color={'#EBE7F5'} />;
          },
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarIcon: () => {
            return <Icon name={'wallet'} color={'#EBE7F5'} />;
          },
          tabBarLabel: () => {
            return null;
          },
        }}
      />
    </Tab.Navigator>
  );
}
