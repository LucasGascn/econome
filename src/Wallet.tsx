import React, {useMemo, useState} from 'react';
import PageContainer from './Layout/PageContainer';
import SearchBar from './Components/SearchBar';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from './Stores/Store';
import CryptoListItem from './Components/Crypto/CryptoListItem';
import {CryptoType} from './Utils/Interfaces';
import {Icon, Switch} from '@rneui/themed';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from './Utils/Interfaces';

const Wallet = (): React.JSX.Element => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const cryptos = useSelector((state: RootState) => state.crypto.cryptoList);
  const wallet = useSelector((state: RootState) => state.crypto.cryptoWallet);
  const [search, setSearch] = useState('');
  const [filtredByAmount, setFiltredByAmount] = useState(true);
  const [filtredByAsc, setFiltredByAsc] = useState(false);

  const completeWallet = useMemo(() => {
    let cryptoList: CryptoType[] = [];
    if (cryptos.length > 0 && Object.keys(wallet).length > 0) {
      Object.keys(wallet).forEach(cryptoId => {
        const cryptoData = cryptos.find(crypto => crypto.uuid === cryptoId);
        const cryptoDetail = wallet[cryptoId];

        if (cryptoData) {
          cryptoList.push({
            uuid: cryptoData.uuid,
            symbol: cryptoData.symbol,
            name: cryptoData.name,
            color: cryptoData.color,
            iconUrl: cryptoData.iconUrl,
            price: filtredByAmount
              ? cryptoDetail.amount.toString()
              : cryptoData.price,
            change: cryptoData.change,
            rank: cryptoData.rank,
            btcPrice: cryptoData.btcPrice,
          });
        }
      });
    }
    cryptoList = filtredByAsc
      ? cryptoList.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      : cryptoList.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));

    return cryptoList.filter(crypto => crypto.name.includes(search));
  }, [cryptos, filtredByAmount, filtredByAsc, search, wallet]);

  return (
    <PageContainer
      child={
        <View style={styles.pageContainer}>
          <View style={styles.searchBar}>
            <SearchBar
              setSearch={setSearch}
              search={search}
              tooltip="Rechercher Cryptos"
              witdh={'70%'}
            />
            <View style={styles.filters}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setFiltredByAsc(!filtredByAsc);
                }}>
                <Text style={styles.buttonText}>
                  {filtredByAsc ? 'Asc' : 'Desc'}
                </Text>
                <Icon name={'filter-list'} color={'#CDB3D4'} size={20} />
              </TouchableOpacity>
              <View style={styles.amountFilter}>
                <Text style={styles.buttonText}>
                  {filtredByAmount ? 'Amount' : 'Value'}
                </Text>
                <Switch
                  value={filtredByAmount}
                  onValueChange={value => setFiltredByAmount(value)}
                />
              </View>
            </View>
          </View>
          <FlatList
            data={completeWallet}
            renderItem={({item}) => {
              return (
                <CryptoListItem
                  item={item}
                  amount={filtredByAmount}
                  navigation={navigation}
                />
              );
            }}
          />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  amountFilter: {
    flexDirection: 'row',
    paddingLeft: 10,
    marginTop: 10,
  },
  filters: {
    width: '30%',
    alignItems: 'flex-start',
  },
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
  },

  buttonText: {paddingRight: 5},
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    height: '15%',
  },
});

export default Wallet;
