import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CryptoType} from './Interfaces';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {Image} from 'react-native';

const styles = StyleSheet.create({
  tile: {
    width: '90%',
    alignSelf: 'center',
    margin: 10,
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',

    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
  },

  nameContainer: {
    width: '50%',
    alignSelf: 'center',
    flexDirection: 'row',
  },

  imgContainer: {
    backgroundColor: '#FFFFFF4D',
    borderRadius: 50,
    width: 40,
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  img: {
    width: 30,
    height: 30,
  },

  price: {fontSize: 20, textAlign: 'right'},
  changePositive: {color: 'green', textAlign: 'right'},
  changeNegative: {color: 'red', textAlign: 'right'},
  text: {fontSize: 25, color: 'white'},
});

const CryptoListItem = (props: {item: CryptoType}): React.JSX.Element => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {item} = props;

  const roundedPrice = Math.round(parseFloat(item.price) * 100) / 100;

  return (
    <TouchableOpacity
      style={styles.tile}
      onPress={() => {
        navigation.navigate('CryptoDetail', {id: item.uuid});
      }}>
      <View style={styles.nameContainer}>
        <View style={styles.imgContainer}>
          <Image
            source={{uri: item.iconUrl.replace('svg', 'png')}}
            style={styles.img}
          />
        </View>
        <Text style={styles.text}>{item.name}</Text>
      </View>
      <View>
        <Text style={styles.price}>{roundedPrice} $</Text>
        <Text
          style={[
            parseFloat(item.change) < 0
              ? styles.changeNegative
              : styles.changePositive,
          ]}>
          {item.change} %
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CryptoListItem;
