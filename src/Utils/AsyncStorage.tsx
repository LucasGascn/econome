import AsyncStorage from '@react-native-async-storage/async-storage';

export async function checkLogin(
  email: string,
  password: string,
  navigation: any,
) {
  const json = await AsyncStorage.getItem(email);
  if (json !== null) {
    const data = JSON.parse(json);
    if (data[2] === email && data[3] === password) {
      navigation.navigate('Home');
      await AsyncStorage.setItem('connected', 'true');
    }
  }
}

export async function getConnected() {
  const json = await AsyncStorage.getItem('connected');
  return json;
}

export async function verifConnected(navigation: any) {
  const json = await AsyncStorage.getItem('connected');
  if (json !== 'true') {
    navigation.navigate('Login');
  }
}
