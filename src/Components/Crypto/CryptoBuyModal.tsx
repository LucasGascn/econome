import React, {useEffect, useMemo, useState} from 'react';
import {Overlay} from '@rneui/themed';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {RootState} from '../../Stores/Store';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../../Stores/reducers/CryptoReducer';
import {roundNumber} from '../../Utils/helper';

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
  const wallet = useSelector((state: RootState) => state.crypto.cryptoWallet);
  const crypto = wallet[uuid] || null;

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

  const styles = StyleSheet.create({
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },

    backdropStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    button: {
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderRadius: 20,
      width: 70,
      padding: 15,
      alignItems: 'center',
    },
    text: {
      color: 'white',
    },
    inputContainer: {
      height: 50,
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 25,

      flexDirection: 'row',
      alignItems: 'center',
    },
    symbolPadding: {
      paddingRight: symbol.toLocaleString().length > 3 ? 15 : 0,
    },
    dolardPadding: {
      justifyContent: 'space-between',
      paddingRight: 15,
    },
    outputContainer: {
      height: 50,
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 25,
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      width: '80%',
      paddingLeft: 20,
      color: 'white',
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

    overlay: {
      borderRadius: 25,
      backgroundColor: '#3E0F50',
      padding: 20,
    },
  });

  return (
    <Overlay
      overlayStyle={styles.overlay}
      isVisible={visible}
      onBackdropPress={toggleOverlay}
      backdropStyle={styles.backdropStyle}>
      <View style={styles.overlayContainer}>
        <Text style={styles.text}>
          Balance : {walletCash} ${' '}
          {crypto && '|  ' + roundNumber(crypto.amount) + ' ' + crypto.symbol}
        </Text>
        <View style={styles.exchangeContainer}>
          <View
            style={[
              styles.inputContainer,
              !buying ? styles.symbolPadding : styles.dolardPadding,
            ]}>
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
          <View
            style={[
              styles.outputContainer,
              buying ? styles.symbolPadding : styles.dolardPadding,
            ]}>
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

export default CryptoBuyModal;
