/* eslint-disable react-hooks/exhaustive-deps */
import {Icon} from '@rneui/themed';
import React, {useEffect} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  SensorTypes,
  accelerometer,
  setUpdateIntervalForType,
} from 'react-native-sensors';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const HEIGHT = SCREEN_HEIGHT * 0.2;
const WIDTH = SCREEN_WIDTH * 0.9;

const CARD_HEIGHT = HEIGHT - 5;
const CARD_WIDTH = WIDTH - 5;

const Wallet =
  (): // props: NativeStackScreenProps<RootStackParamList, 'Wallet'>,
  React.JSX.Element => {
    const rotateX = useSharedValue(0);
    const rotateY = useSharedValue(0);

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

    const rStyle = useAnimatedStyle(() => {
      const rotateXvalue = `${rotateX.value * 1.3}deg`;
      const rotateYvalue = `${rotateY.value * 1.3}deg`;

      return {
        transform: [
          {
            perspective: 3000,
          },
          {rotateX: rotateXvalue},
          {rotateY: rotateYvalue},
        ],
      };
    }, []);

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.cardContainer, rStyle]}>
          <ImageBackground
            source={require('./assets/wallpaper.jpeg')}
            resizeMode="cover"
            style={styles.imageBackground}
            blurRadius={40}>
            <Text style={styles.balanceText}>Balance</Text>
            <View style={styles.balanceContainer}>
              <Text style={styles.balance}>$ 55,202.29</Text>
              <Text style={[styles.balanceUpdate, styles.positive]}>+ 32%</Text>
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Envoyer</Text>
                <Icon name={'call-made'} color={'#CDB3D4'} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Recevoir</Text>
                <Icon name={'call-received'} color={'#CDB3D4'} />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </Animated.View>
      </View>
    );
  };

const styles = StyleSheet.create({
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    paddingTop: 30,
  },
  button: {
    flexDirection: 'row',
    borderRadius: 50,
    backgroundColor: 'rgba(35, 14, 60, 0.4)',
    padding: 10,
  },

  buttonText: {paddingRight: 5},
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
  balanceText: {fontSize: 15},
  balance: {fontSize: 20, fontWeight: 'bold'},
  balanceUpdate: {fontSize: 15, fontWeight: 'bold'},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',

    paddingRight: 50,
  },

  imageBackground: {
    borderRadius: 20,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    padding: 20,
  },

  cardContainer: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 0.1,
    position: 'absolute',
    borderRadius: 20,
    zIndex: 300,

    overflow: 'hidden',
  },
});

export default Wallet;
