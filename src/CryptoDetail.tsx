/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {url} from './api/helper';
import { CryptoDetail, Crypto } from "./interfaces.tsx";
import {Image, Text} from '@rneui/base';

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: 'white',
    flex: 1,
  },

  image: {
    height: 300,
    width: 300,
  },
});

const CryptoDetailPage = ({route}: any): React.JSX.Element => {
  const {id} = route.params;
  const [cryptoDetail, setCryptoDetail] = useState<CryptoDetail>({});

  const getCryptoDetail = useCallback(() => {
    const requestUrl = url('coins/markets?vs_currency=usd&ids=' + id);
    console.log(id + ' requested');
    axios
      .get(requestUrl)
      .then(function (response) {
        setCryptoDetail(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getCryptoDetail();
  }, []);

  return (
    <View style={styles.pageContainer}>
      <Text>{cryptoDetail.name}</Text>
      <Text>{cryptoDetail.name}</Text>
      <Text>{cryptoDetail.current_price} €</Text>

      {cryptoDetail.image && (
        <Image style={styles.image} source={{uri: cryptoDetail.image}} />
      )}
    </View>
  );
};

export default CryptoDetailPage;
