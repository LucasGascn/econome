/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {url} from './api/helper';
import {SearchBar} from '@rneui/themed';
import Header from './Header';
import {verifConnected} from './helper/AsyncStorage';

type Crypto = {
  id: string;
  name: string;
  symbol: string;
};

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
  const [cryptos, setCryptos] = useState<Crypto[]>([]);

  const [search, setSearch] = useState('');

  const searchedCryptos = useMemo<Crypto[]>(() => {
    return cryptos.filter(crypto => crypto.name.includes(search));
  }, [cryptos, search]);

  const getCryptos = useCallback(() => {
    const requestUrl = url('coins/list?include_platform=false');
    axios
      .get(requestUrl)
      .then(function (response) {
        setCryptos(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    verifConnected(navigation);
    getCryptos();
  }, []);

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
        data={searchedCryptos}
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
