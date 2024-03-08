import AsyncStorage from '@react-native-async-storage/async-storage';
import {actions} from '../Stores/Reducers/AccountReducer';
import * as reducer from '../Stores/Reducers/CryptoReducer';
import {StoreDispatch} from '../Stores/Store';
import {CryptoWallet} from '../Stores/Reducers/CryptoReducer';

export async function checkLogin(
  email: string,
  password: string,
  navigation: any,
  dispatch: StoreDispatch,
) {
  const json = await AsyncStorage.getItem(email);
  if (json !== null) {
    const data = JSON.parse(json);
    if (data[2] === email && data[3] === password) {
      dispatch(
        actions.setAccountData({
          nom: data[1],
          prenom: data[0],
          email: data[2],
          password: data[3],
        }),
      );
      reducer.loadWallet(data[2], dispatch);
      await AsyncStorage.setItem('connected', 'true');
    }
  }
}

export async function setWallet(email: string, wallet: CryptoWallet) {
  await AsyncStorage.setItem(email + '-wallet', JSON.stringify(wallet));
}

export async function getWallet(email: string) {
  const json = await AsyncStorage.getItem(email + '-wallet');
  return json;
}

export async function getConnected() {
  await AsyncStorage.setItem('connected', 'false');
  const json = await AsyncStorage.getItem('connected');
  return json;
}

export async function verifConnected(navigation: any) {
  const json = await AsyncStorage.getItem('connected');
  if (json !== 'true') {
    navigation.navigate('Login');
  }
}
