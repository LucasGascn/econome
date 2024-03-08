import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {BackgroundGradient} from './Components/BackgroundGradient';
import {Image} from '@shopify/react-native-skia';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {CryptoDetailType} from './Interfaces';
import {url} from './api/helper';
import axios from 'axios';
import {CARD_HEIGHT, CARD_WIDTH, styles, WIDTH, HEIGHT} from './CryptoDetail';

export const CryptoDetail = (
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

  return (
    <View style={styles.container}>
      <BackgroundGradient width={WIDTH} height={HEIGHT} />
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            {
              height: CARD_HEIGHT,
              width: CARD_WIDTH,
              backgroundColor: 'black',
              position: 'absolute',
              borderRadius: 20,
              zIndex: 300,
            },
            rStyle,
          ]}>
          <View>
            <Image />
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};
