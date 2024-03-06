import AsyncStorage from '@react-native-async-storage/async-storage';

async function checkLogin(email: string, password: string, navigation: any) {
  const json = await AsyncStorage.getItem(email);
  if (json !== null) {
    const data = JSON.parse(json);
    if (data[2] === email && data[3] === password) navigation.navigate('Home');
  }
}

export default checkLogin;
