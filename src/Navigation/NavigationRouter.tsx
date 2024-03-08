import * as React from 'react';
import {getConnected} from '../Utils/AsyncStorage';
import {useState} from 'react';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import {NavigationContainer} from '@react-navigation/native';

export default function NavigationRouter(): React.JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  React.useEffect(() => {
    getConnected().then(res => {
      setIsLoggedIn(res === 'true');
    });
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
