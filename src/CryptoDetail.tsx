/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {CryptoDetailType} from './Interfaces';
import {url} from './api/helper';
import axios from 'axios';
import PageContainer from './Layout/PageContainer';
import {SvgUri} from 'react-native-svg';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const HEIGHT = 256 * 2;
const WIDTH = SCREEN_WIDTH * 0.9;

const CARD_HEIGHT = HEIGHT - 5;
const CARD_WIDTH = WIDTH - 5;

const CryptoDetail = (
  props: NativeStackScreenProps<RootStackParamList, 'CryptoDetail'>,
): React.JSX.Element => {
  const [cryptoDetail, setCryptoDetail] = useState<CryptoDetailType>();

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

  const {id}: {id: string} = props.route.params;
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin(event => {
      rotateX.value = withTiming(
        interpolate(event.y, [0, CARD_HEIGHT], [10, -10], Extrapolate.CLAMP),
      );
      rotateY.value = withTiming(
        interpolate(event.x, [0, CARD_WIDTH], [-10, 10], Extrapolate.CLAMP),
      );
    })
    .onUpdate(event => {
      // topLeft (10deg, -10deg)
      // topRight (10deg, 10deg)
      // bottomRight (-10deg, 10deg)
      // bottomLeft (-10deg, -10deg)

      rotateX.value = interpolate(
        event.y,
        [0, CARD_HEIGHT],
        [10, -10],
        Extrapolate.CLAMP,
      );
      rotateY.value = interpolate(
        event.x,
        [0, CARD_WIDTH],
        [-10, 10],
        Extrapolate.CLAMP,
      );
    })
    .onFinalize(() => {
      rotateX.value = withTiming(0);
      rotateY.value = withTiming(0);
    });

  const rStyle = useAnimatedStyle(() => {
    const rotateXvalue = `${rotateX.value}deg`;
    const rotateYvalue = `${rotateY.value}deg`;

    return {
      transform: [
        {
          perspective: 300,
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

  console.log(cryptoDetail?.supply);

  return (
    <PageContainer
      child={
        <GestureHandlerRootView style={{flex: 1}}>
          <View style={styles.container}>
            <GestureDetector gesture={gesture}>
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
                    <Text style={styles.text}>{cryptoDetail?.name}</Text>
                    <Text style={styles.rank}>Ranked {cryptoDetail?.rank}</Text>
                  </View>
                  <View style={styles.descContainer}>
                    <Text style={styles.desc}>{cryptoDetail?.description}</Text>
                    <View style={styles.desc}>
                      <Text style={styles.textWhite}>Recent change :</Text>
                      <Text
                        style={[
                          parseFloat(cryptoDetail?.change || '0') < 0
                            ? styles.negative
                            : styles.positive,
                        ]}>
                        {roundPrice(cryptoDetail?.change || '')} $
                      </Text>
                      <Text style={styles.textWhite}>
                        {'\n'}
                        Current price : {roundPrice(
                          cryptoDetail?.price || '',
                        )}{' '}
                        $
                      </Text>
                      <Text style={styles.textWhite}>
                        {'\n'}
                        Highest price :{' '}
                        {roundPrice(cryptoDetail?.allTimeHigh.price || '')} $
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.textBottom}>
                    Circulating : {cryptoDetail?.supply.circulating}
                    {'\n'}
                    {'\n'}
                    Total : {cryptoDetail?.supply.total}
                    {'\n'}
                    {'\n'}
                    Market Number : {cryptoDetail?.numberOfMarkets}
                    {'\n'}
                    {'\n'} Exchange Number : {cryptoDetail?.numberOfExchanges}
                  </Text>

                  <SvgUri
                    style={styles.image}
                    height={'50%'}
                    uri={cryptoDetail?.iconUrl || null}
                  />
                </View>
              </Animated.View>
            </GestureDetector>
          </View>
        </GestureHandlerRootView>
      }
    />
  );
};

const styles = StyleSheet.create({
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
    marginTop: 30,
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
