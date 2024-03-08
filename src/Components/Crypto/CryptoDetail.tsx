/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  SensorTypes,
  accelerometer,
  setUpdateIntervalForType,
} from 'react-native-sensors';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {CryptoDetailType} from '../../Utils/Interfaces';
import {url} from '../../Utils/Helper';
import axios from 'axios';
import PageContainer from '../../Layout/PageContainer';
import {SvgUri} from 'react-native-svg';
import {Icon} from '@rneui/themed';
import CryptoBuyModal from './CryptoBuyModal';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const HEIGHT = SCREEN_HEIGHT * 0.7;
const WIDTH = SCREEN_WIDTH * 0.9;

const CARD_HEIGHT = HEIGHT - 5;
const CARD_WIDTH = WIDTH - 5;

const CryptoDetail = (
  props: NativeStackScreenProps<RootStackParamList, 'CryptoDetail'>,
): React.JSX.Element => {
  const [cryptoDetail, setCryptoDetail] = useState<CryptoDetailType>();
  const [buying, setBuying] = useState(false);

  const {id}: {id: string} = props.route.params;

  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const [visible, setVisible] = useState(false);

  setUpdateIntervalForType(SensorTypes.accelerometer, 400);

  useEffect(() => {
    const subscription = accelerometer.subscribe(({x, y}) => {
      // Adjust the interpolation ranges to balance the tilt response
      rotateX.value = withTiming(
        interpolate(x, [-1, 1], [7.5, -7.5], Extrapolate.CLAMP),
      );
      rotateY.value = withTiming(
        interpolate(y, [-1, 1], [-7.5, 7.5], Extrapolate.CLAMP),
      );
    });

    return () => {
      subscription.unsubscribe(); // Unsubscribe from accelerometer data when component unmounts
    };
  }, []);

  const getCryptoDetail = useCallback(() => {
    const requestUrl = url('coin/' + id);
    axios
      .get(requestUrl)
      .then(function (response) {
        setCryptoDetail(response.data.data.coin);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getCryptoDetail();
  }, []);

  const rStyle = useAnimatedStyle(() => {
    const rotateXvalue = `${rotateX.value * 1.2}deg`;
    const rotateYvalue = `${rotateY.value * 1.2}deg`;

    return {
      transform: [
        {
          perspective: 6000,
        },
        {rotateX: rotateXvalue},
        {rotateY: rotateYvalue},
      ],
    };
  }, []);

  function roundPrice(item: string): string {
    const price: number = parseFloat(item);
    let roundedPrice: string;

    if (Math.abs(price) < 0.001) {
      roundedPrice = price.toExponential(2);
    } else {
      roundedPrice = (Math.round(price * 100) / 100).toFixed(2);
    }

    return roundedPrice;
  }

  if (!cryptoDetail) {
    return <></>;
  }

  return (
    <PageContainer
      child={
        <View style={styles.container}>
          <Animated.View
            style={[
              {
                height: CARD_HEIGHT,
                width: CARD_WIDTH,
                backgroundColor: '#800080' + '4D',
                borderColor: '#8000801A',
                borderWidth: 1,
                position: 'absolute',
                borderRadius: 20,
                zIndex: 300,
              },
              rStyle,
            ]}>
            <View style={styles.cryptoContainer}>
              <View style={styles.cryptoContainerTitle}>
                <Text style={styles.text}>{cryptoDetail.name}</Text>
                <Text style={styles.rank}>Ranked {cryptoDetail.rank}</Text>
              </View>
              <View style={styles.descContainer}>
                <Text style={styles.desc}>{cryptoDetail.description}</Text>
                <View style={styles.desc}>
                  <Text style={styles.textWhite}>Recent change :</Text>
                  <Text
                    style={[
                      parseFloat(cryptoDetail.change || '0') < 0
                        ? styles.negative
                        : styles.positive,
                    ]}>
                    {roundPrice(cryptoDetail.change || '')} $
                  </Text>
                  <Text style={styles.textWhite}>
                    {'\n'}
                    Current price : {roundPrice(cryptoDetail.price || '')} $
                  </Text>
                  <Text style={styles.textWhite}>
                    {'\n'}
                    Highest price :{' '}
                    {roundPrice(cryptoDetail.allTimeHigh.price || '')} $
                  </Text>
                </View>
              </View>

              <Text style={styles.textBottom}>
                Circulating : {cryptoDetail.supply.circulating}
                {'\n'}
                {'\n'}
                Total : {cryptoDetail.supply.total}
                {'\n'}
                {'\n'}
                Market Number : {cryptoDetail.numberOfMarkets}
                {'\n'}
                {'\n'} Exchange Number : {cryptoDetail.numberOfExchanges}
              </Text>

              <SvgUri
                style={styles.image}
                height={'50%'}
                uri={cryptoDetail.iconUrl || null}
              />

              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.buyButton]}
                  onPress={() => {
                    setBuying(true);
                    setVisible(true);
                  }}>
                  <Text style={styles.buttonText}>Acheter</Text>
                  <Icon name={'shopping-cart'} color={'#CDB3D4'} size={20} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.sellButton]}
                  onPress={() => {
                    setBuying(false);
                    setVisible(true);
                  }}>
                  <Text style={styles.buttonText}>Vendre</Text>
                  <Icon name={'sell'} color={'#CDB3D4'} size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
          <CryptoBuyModal
            buying={buying}
            visible={visible}
            setVisible={setVisible}
            symbol={cryptoDetail.symbol}
            price={parseFloat(cryptoDetail.price)}
            uuid={cryptoDetail.uuid}
          />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
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
  buyButton: {backgroundColor: 'rgba(0, 255, 0, 0.5)'},
  sellButton: {backgroundColor: 'rgba(255, 0, 0, 0.5)'},

  buttonText: {paddingRight: 5},

  cryptoContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cryptoContainerTitle: {marginBottom: 10},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  negative: {
    color: 'red',
  },
  positive: {
    color: 'green',
  },
  text: {
    marginTop: 15,
    fontSize: 50,
  },

  textWhite: {
    color: 'white',
  },
  rank: {
    marginTop: -5,
    marginLeft: 5,
    fontSize: 15,
  },
  desc: {
    padding: 10,
    width: '40%',
    backgroundColor: '#8000804D',
    color: 'white',
    borderRadius: 10,
  },

  textBottom: {
    marginTop: 20,
    padding: 10,
    width: '90%',
    backgroundColor: '#8000804D',
    color: 'white',
    borderRadius: 10,
  },
  descContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },

  image: {
    position: 'absolute',
    top: 120,
    opacity: 0.65,
  },
});

export default CryptoDetail;
