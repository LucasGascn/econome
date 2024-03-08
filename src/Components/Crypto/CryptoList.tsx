/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {url} from '../../Utils/helper';
import CryptoListItem from './CryptoListItem';
import {CryptoType} from '../../Utils/Interfaces';
import SearchBar from '../SearchBar';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    marginTop: 10,
  },
});

const CryptoList = (): React.JSX.Element => {
  const [cryptos, setCryptos] = useState<CryptoType[]>([]);

  const [search, setSearch] = useState('');

  const searchedCryptos = useMemo<CryptoType[]>(() => {
    return cryptos.filter(crypto => crypto.name.includes(search));
  }, [cryptos, search]);

  const getCryptos = useCallback(() => {
    axios
      .get(url('coins'))
      .then(function (response) {
        setCryptos(response.data.data.coins);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getCryptos();
  }, []);

  return (
    <View style={styles.pageContainer}>
      <SearchBar
        setSearch={setSearch}
        search={search}
        tooltip="Rechercher Cryptos"
      />
      <FlatList
        data={searchedCryptos}
        renderItem={({item}) => {
          return <CryptoListItem item={item} />;
        }}
      />
    </View>
  );
};

export default CryptoList;
