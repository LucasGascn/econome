/* eslint-disable react-hooks/exhaustive-deps */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CryptoDetailType} from './Interfaces';
import {RootStackParamList} from '../App';
import {Image, Text} from '@rneui/base';
import {url} from './api/helper';
import axios from 'axios';

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

const CryptoDetail = (
  props: NativeStackScreenProps<RootStackParamList, 'CryptoDetail'>,
): React.JSX.Element => {
  const {id}: {id: string} = props.route.params;
  const [cryptoDetail, setCryptoDetail] = useState<CryptoDetailType>();

  const getCryptoDetail = useCallback(() => {
    const requestUrl = url('coin/' + id);
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

  if (!cryptoDetail) {
    return <View style={styles.pageContainer} />;
  }

  return (
    <View style={styles.pageContainer}>
      <Text>{cryptoDetail.name}</Text>
      <Text>{cryptoDetail.price} €</Text>

      {cryptoDetail.iconUrl && (
        <Image style={styles.image} source={{uri: cryptoDetail.iconUrl}} />
      )}
    </View>
  );
};

export default CryptoDetail;
