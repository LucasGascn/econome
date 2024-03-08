/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from '@rneui/base';
import {Provider} from 'react-redux';
import store from './src/Stores/Store';
import Wallet from './src/Wallet';
import {RootStackParamList} from './src/Utils/Interfaces';
import MainStack from './src/Navigation/MainStack';
import {getConnected} from './src/Utils/AsyncStorage';
import {useState} from 'react';

export default function App(): React.JSX.Element {
  const Tab = createBottomTabNavigator<RootStackParamList>();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  getConnected().then(res => {
    setIsLoggedIn(res === 'true');
  });

  return (
    <NavigationContainer>
      <Provider store={store}>
        {isLoggedIn ? (
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
        ) : (
          <MainStack />
        )}
      </Provider>
    </NavigationContainer>
  );
}
