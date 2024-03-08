/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import CryptoListItem from './CryptoListItem';
import {CryptoType} from '../../Utils/Interfaces';
import SearchBar from '../SearchBar';
import {useDispatch, useSelector} from 'react-redux';
import {getCryptos} from '../../Stores/Reducers/CryptoReducer';
import {StoreDispatch, RootState} from '../../Stores/Store';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';

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
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const dispatch = useDispatch<StoreDispatch>();

  useEffect(() => {
    dispatch(getCryptos());

    const intervalId = setInterval(() => {
      dispatch(getCryptos());
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const [search, setSearch] = useState('');
  const cryptos = useSelector((state: RootState) => state.crypto.cryptoList);

  const searchedCryptos = useMemo<CryptoType[]>(() => {
    return cryptos.filter(crypto => crypto.name.includes(search));
  }, [cryptos, search]);

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
          return <CryptoListItem item={item} navigation={navigation} />;
        }}
      />
    </View>
  );
};

export default CryptoList;
