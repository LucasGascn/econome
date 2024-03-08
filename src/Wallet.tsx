/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
//import {SearchBar} from '@rneui/themed';
// import {useSelector} from 'react-redux';
import PageContainer from './Layout/PageContainer';
// import {RootState} from './Stores/Store';
import SearchBar from './Components/SearchBar';
import {StyleSheet, View} from 'react-native';

const Wallet = (): //  {navigation}: any
React.JSX.Element => {
  //const wallet = useSelector((state: RootState) => state.crypto.cryptoWallet);
  const [search, setSearch] = useState('');
  return (
    <PageContainer
      child={
        <View style={styles.pageContainer}>
          <SearchBar
            setSearch={setSearch}
            search={search}
            tooltip="Rechercher Cryptos"
          />

          {/* <FlatList
            data={searchedCryptos}
            renderItem={({item}) => {
              return <CryptoListItem item={item} />;
            }}
          /> */}
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
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

export default Wallet;
