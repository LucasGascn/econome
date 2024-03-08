import React, {useEffect} from 'react';
import CryptoList from './Components/Crypto/CryptoList';
import PageContainer from './Layout/PageContainer';
import {View} from 'react-native';
import Wallet from './Components/WalletAnimation';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from './Utils/Interfaces';
import {verifConnected} from './Utils/AsyncStorage';

const Home = (): React.JSX.Element => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    verifConnected(navigation);
  }, [navigation]);

  return (
    <PageContainer
      child={
        <View style={{flex: 1}}>
          <View style={{height: '30%'}}>
            <Wallet />
          </View>
          <CryptoList />
        </View>
      }
    />
  );
};

export default Home;
