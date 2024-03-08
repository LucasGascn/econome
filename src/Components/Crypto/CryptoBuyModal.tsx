import React, {useEffect, useMemo, useState} from 'react';
import {Overlay} from '@rneui/themed';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {RootState} from '../../Stores/Store';
import {useDispatch, useSelector} from 'react-redux';
import {TextInput} from 'react-native-gesture-handler';
import {actions} from '../../Stores/reducers/CryptoReducer';

type CryptoBuyModalProps = {
  uuid: string;
  price: number;
  buying: boolean;
  visible: boolean;
  setVisible: Function;
  symbol: string;
};
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const CryptoBuyModal: React.FunctionComponent<CryptoBuyModalProps> = props => {
  const {uuid, price, buying, symbol, visible, setVisible} = props;
  const walletCash = useSelector((state: RootState) => state.crypto.money);
  const dispatch = useDispatch();

  const [input, setInput] = useState('');

  const output = useMemo(() => {
    if (buying) {
      return parseFloat(input) / price;
    } else {
      return parseFloat(input) * price;
    }
  }, [buying, input, price]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (!visible) {
      setInput('0');
    }
  }, [visible]);

  const handleBuy = () => {
    if (buying) {
      if (walletCash >= parseFloat(input)) {
        dispatch(
          actions.buyOrSellCrypto({
            uuid: uuid,
            symbol: symbol,
            amount: output,
            usd: -parseFloat(input),
          }),
        );
      } else {
        console.log('Insufficient funds');
      }
    }
  };

  return (
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
      <View style={styles.overlayContainer}>
        <Text style={styles.text}>Balance : {walletCash} $</Text>
        <View style={styles.exchangeContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={inputChange => {
                setInput(inputChange);
              }}
            />

            {buying ? (
              <Text style={styles.text}> $ </Text>
            ) : (
              <Text style={styles.text}> {symbol} </Text>
            )}
          </View>
          <View style={styles.outputContainer}>
            <Text style={styles.input}>{output}</Text>
            {!buying ? (
              <Text style={styles.text}> $</Text>
            ) : (
              <Text style={styles.text}> {symbol} </Text>
            )}
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => {
              handleBuy();
            }}
            style={styles.button}>
            <Text style={styles.text}>{buying ? 'Buy' : 'Sell'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleOverlay} style={styles.button}>
            <Text style={styles.text}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },

  button: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,

    padding: 15,
  },
  text: {
    color: 'black',
  },
  inputContainer: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 25,

    flexDirection: 'row',
    alignItems: 'center',
  },
  outputContainer: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 25,

    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    paddingLeft: 20,
    paddingRight: 20,
    color: 'black',
  },
  exchangeContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    height: '60%',
  },
  overlayContainer: {
    height: SCREEN_HEIGHT * 0.3,
    width: SCREEN_WIDTH * 0.5,
    justifyContent: 'space-between',
  },
});

export default CryptoBuyModal;
