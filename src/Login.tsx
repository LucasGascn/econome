import React, {useCallback, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import checkLogin from './helper/AsyncStorage';
import SignUp from './SignUp';

const styles = StyleSheet.create({
  button: {marginTop: 30},
  buttonText: {
    color: 'black',
  },
  inputsContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  inputs: {
    marginTop: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    width: '80%',
    padding: 5,
    height: 60,
    color: 'black',
  },
  invalid: {
    borderColor: 'red',
  },
  pageContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  loginContainer: {
    alignItems: 'center',
    paddingTop: 20,
    height: '100%',
  },

  loginText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },

  avatar: {
    marginTop: 20,
    width: 150,
    height: 150,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

const Login = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const navigation = useNavigation();
  return (
    <View style={styles.pageContainer}>
      <ScrollView>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Connexion</Text>
          <Image
            style={styles.avatar}
            source={require('../assets/batman.webp')}
          />
          <View style={styles.inputsContainer}>
            <TextInput
              style={styles.inputs}
              value={email}
              placeholder={'Email'}
              placeholderTextColor={'black'}
              onChangeText={text => {
                setEmail(text);
              }}
            />
            <TextInput
              style={[styles.inputs, !passwordIsValid && styles.invalid]}
              value={password}
              placeholder={'Mot de passe'}
              placeholderTextColor={'black'}
              secureTextEntry
              onChangeText={text => {
                setPassword(text);
              }}
              onEndEditing={() => {
                setPasswordIsValid(password.length > 3);
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              checkLogin(email, password, navigation);
            }}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate('SignUp')}>
            Vous n'avez pas de compte? Inscrivez-vous ici.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
