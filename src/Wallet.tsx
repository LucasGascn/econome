/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet, View, TouchableOpacity, Text} from 'react-native';
//import {SearchBar} from '@rneui/themed';
import Header from './Header.tsx';
import { useDispatch, useSelector } from 'react-redux';
import {actions as cryptoActions} from './stores/reducers/cryptoReducer.tsx'
import { Crypto } from './interfaces.tsx'
import { SearchBar } from '@rneui/base';
import axios from 'axios';
import {url} from './api/helper.js';
import { Image } from '@rneui/themed';

const Wallet = ({navigation}: any): React.JSX.Element => {
  const {loggedInUser} = useSelector((s: any) => s.account)
  const {boughtCryptos} = useSelector((s: any) => s.crypto)
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();

  const searchedCryptosList = useMemo(() => {
      return boughtCryptos.filter((crypto: Crypto) => crypto.name.includes(search))
  }, [boughtCryptos, search]);

  return (
    <View style={styles.pageContainer}>
      <View style={styles.profileHeader}>
        <Image
            style={styles.profilePic}
            source={require('../assets/batman.webp')}
          />
        <Text style={styles.profileName}>{`${loggedInUser.name} ${loggedInUser.surname}`}</Text>
      </View>

      <Text style={styles.walletValue}>Wallet: {loggedInUser.wallet}</Text>

      <View style={styles.searchBar}>
        <SearchBar
          placeholder="Search cryptos"
          onChangeText={(text) => {
            setSearch(text);
          }}
          value={search}
        />
      </View>
      
      <FlatList
        data={searchedCryptosList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tile}
            onPress={() => navigation.navigate('CryptoDetail', { id: item.id })}>
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f2f2f2', // Light grey background for the header
  },
  profilePic: {
    width: 50, // Adjust size as needed
    height: 50, // Adjust size as needed
    borderRadius: 25, // Circular image
  },
  profileName: {
    flex: 1,
    marginLeft: 10, // Space between image and name
    fontSize: 18,
    fontWeight: 'bold',
  },
  walletValue: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20, // Adjust as needed
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

export default Wallet;