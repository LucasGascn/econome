import React from 'react';
import CryptoList from './Components/Crypto/CryptoList';
import PageContainer from './Layout/PageContainer';
import {View} from 'react-native';
import Wallet from './Components/WalletAnimation';

const Home = (): React.JSX.Element => {
  console.log('home');
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
