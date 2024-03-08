import React, {useCallback, useMemo, useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from './Utils/Interfaces';

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
    height: 400,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  inputs: {
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
    height: '50%',
    width: '60%',
  },

  inscriptionContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },

  inscriptionText: {
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

    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface SignUpProps {
  navigation: NavigationProp<RootStackParamList>;
}

const SignUp: React.FC<SignUpProps> = ({navigation}) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  const passwordConfirmValid = useMemo(() => {
    return password === passwordConfirm;
  }, [password, passwordConfirm]);
  const checkForm = useCallback(async () => {
    if (name && lastName && password.length > 2 && passwordConfirmValid) {
      var data = [name, lastName, email, password];
      const json = JSON.stringify(data);
      await AsyncStorage.setItem(email, json);
      navigation.navigate('Login');
    }
  }, [name, lastName, password, passwordConfirmValid, email, navigation]);
  return (
    <ImageBackground
      source={require('./Assets/login.jpeg')}
      resizeMode="cover"
      style={styles.image}>
      <View style={styles.pageContainer}>
        <ScrollView>
          <View style={styles.inscriptionContainer}>
            <Text style={styles.inscriptionText}>Sign up</Text>
            <View style={styles.inputsContainer}>
              <TextInput
                style={styles.inputs}
                value={name}
                placeholder={'Prénom'}
                placeholderTextColor={'white'}
                onChangeText={text => {
                  setName(text);
                }}
              />
              <TextInput
                style={styles.inputs}
                value={lastName}
                placeholder={'Nom'}
                placeholderTextColor={'white'}
                onChangeText={text => {
                  setLastName(text);
                }}
              />
              <TextInput
                style={styles.inputs}
                value={email}
                placeholder={'email'}
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
              <TextInput
                style={[styles.inputs, !passwordConfirmValid && styles.invalid]}
                value={passwordConfirm}
                placeholder={'Confirmation Mot de passe'}
                placeholderTextColor={'white'}
                secureTextEntry
                onChangeText={text => {
                  setPasswordConfirm(text);
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                checkForm();
              }}>
              {<Text style={styles.buttonText}>Send</Text>}
            </TouchableOpacity>
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate('Login')}>
              Sign in
            </Text>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default SignUp;
