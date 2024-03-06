import React, {useCallback, useMemo, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  button: {marginTop: 30},
  buttonText: {
    color: 'black',
  },
  inputsContainer: {
    height: 400,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  inputs: {
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
  inscriptionContainer: {
    alignItems: 'center',
    paddingTop: 20,
    height: '100%',
  },

  inscriptionText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },

  avatar: {
    marginTop: 20,
    width: 150,
    height: 150,
  },
});

const SignUp = (): React.JSX.Element => {
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
      loadData();
    }
  }, [name, lastName, password, email, passwordConfirmValid]);
  const loadData = async () => {
    const json = await AsyncStorage.getItem(email);
    if (!json) {
      return;
    }
    return JSON.parse(json);
  };
  return (
    <View style={styles.pageContainer}>
      <ScrollView>
        <View style={styles.inscriptionContainer}>
          <Text style={styles.inscriptionText}>Inscription</Text>
          <Image
            style={styles.avatar}
            source={require('../assets/batman.webp')}
          />
          <View style={styles.inputsContainer}>
            <TextInput
              style={styles.inputs}
              value={name}
              placeholder={'Prénom'}
              placeholderTextColor={'black'}
              onChangeText={text => {
                setName(text);
              }}
            />

            <TextInput
              style={styles.inputs}
              value={lastName}
              placeholder={'Nom'}
              placeholderTextColor={'black'}
              onChangeText={text => {
                setLastName(text);
              }}
            />
            <TextInput
              style={styles.inputs}
              value={email}
              placeholder={'email'}
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
            <TextInput
              style={[styles.inputs, !passwordConfirmValid && styles.invalid]}
              value={passwordConfirm}
              placeholder={'Confirmation Mot de passe'}
              placeholderTextColor={'black'}
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
            {<Text style={styles.buttonText}>Envoyer</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;
