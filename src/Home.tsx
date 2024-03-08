import React from 'react';
import CryptoList from './CryptoList';
import PageContainer from './Layout/PageContainer';
import {View} from 'react-native';
import Wallet from './Wallet';

const Home = (): React.JSX.Element => {
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
