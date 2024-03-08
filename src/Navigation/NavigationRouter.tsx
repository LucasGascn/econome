/* eslint-disable no-lone-blocks */
import * as React from 'react';
import {useState} from 'react';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../Stores/Store';

export default function NavigationRouter(): React.JSX.Element {
  const user = useSelector((state: RootState) => state.account.loggedInUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  React.useEffect(() => {
    {
      setIsLoggedIn(
        !(
          user.nom === null &&
          user.prenom === null &&
          user.email === null &&
          user.password === null
        ),
      );
    }
  }, [user]);
  return (
    <NavigationContainer>
      {isLoggedIn ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
