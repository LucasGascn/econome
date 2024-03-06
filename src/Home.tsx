/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet, View, TouchableOpacity, Text} from 'react-native';
//import {SearchBar} from '@rneui/themed';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import {actions as cryptoActions} from './stores/reducers/cryptoReducer.tsx'
import { Crypto } from './interfaces'
import { SearchBar } from '@rneui/base';
import axios from 'axios';
import {url} from './api/helper.js';

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: 'white',
    flex: 1,
  },

  button: {
    marginTop: 10,
  },

  tile: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'grey',
    margin: 10,
    padding: 20,
    alignItems: 'center',
  },

  text: {
    fontSize: 30,
    color: 'black',
  },
  searchBar: {
    margin: 10,
  },
});

const Home = ({navigation}: any): React.JSX.Element => {
  const {cryptosList} = useSelector((s: any) => s.crypto)
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const requestUrl = url('coins/list?include_platform=false');
    axios
    .get(requestUrl)
    .then(function (response) {
        dispatch(cryptoActions.setCryptosList(response.data))
    })
    .catch(function (error) {
        console.log(error);
    });
  }, []);

  const searchedCryptosList = useMemo(() => {

      return cryptosList.filter((crypto: Crypto) => crypto.name.includes(search))
  }, [cryptosList, search]);

  return (
    <View style={styles.pageContainer}>
      <Header />

      <View style={styles.searchBar}>
        <SearchBar
          placeholder="Rechercher cryptos"
          onChangeText={text => {
            setSearch(text);
          }}
          value={search}
        />
      </View>
      <FlatList
        data={searchedCryptosList}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.tile}
              onPress={() => {
                navigation.navigate('CryptoDetail', {id: item.id});
              }}>
              {<Text style={styles.text}>{item.name}</Text>}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Home;
