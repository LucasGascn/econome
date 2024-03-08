import React, {useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {checkLogin} from './Utils/AsyncStorage';
import {RootStackParamList} from './Utils/Interfaces';
import {useDispatch} from 'react-redux';

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    marginBottom: 15,
    borderRadius: 15,
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  buttonText: {
    color: 'white',
  },
  inputsContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  inputs: {
    marginTop: 20,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    width: '80%',
    padding: 5,
    height: 60,
    color: 'white',
  },
  invalid: {
    borderColor: 'red',
  },
  pageContainer: {
    flex: 1,
  },
  loginContainer: {
    alignItems: 'center',
    paddingTop: 20,

    height: '55%',
    width: '60%',
  },

  loginText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },

  avatar: {
    marginTop: 20,
    width: 150,
    height: 150,
  },
  linkText: {
    color: '#599ff0',
    textDecorationLine: 'underline',
    borderRadius: 15,

    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  image: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface LoginProps {
  navigation: NavigationProp<RootStackParamList>;
}

const Login: React.FC<LoginProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const dispatch = useDispatch();
  return (
    <View style={styles.pageContainer}>
      <ImageBackground
        source={require('./Assets/login.jpeg')}
        resizeMode="cover"
        style={styles.image}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Login</Text>
            <View style={styles.inputsContainer}>
              <TextInput
                style={styles.inputs}
                value={email}
                placeholder={'Email'}
                placeholderTextColor={'white'}
                onChangeText={text => {
                  setEmail(text);
                }}
              />
              <TextInput
                style={[styles.inputs, !passwordIsValid && styles.invalid]}
                value={password}
                placeholder={'Mot de passe'}
                placeholderTextColor={'white'}
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
                checkLogin(email, password, navigation, dispatch);
              }}>
              <Text style={styles.buttonText}>Connect</Text>
            </TouchableOpacity>
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate('SignUp')}>
              Sign up
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Login;
