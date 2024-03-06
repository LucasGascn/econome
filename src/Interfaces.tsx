import {Int32} from 'react-native/Libraries/Types/CodegenTypes';

export type CryptoType = {
  uuid: string;
  symbol: string;
  name: string;
  color: string;
  iconUrl: string;
  price: string;
  change: string;
  rank: 1;
  btcPrice: '1';
};

export type CryptoDetailType = {
  uuid: string;
  symbol: string;
  name: string;
  description: string;
  color: string;
  iconUrl: string;
  websiteUrl: string;
  price: string;
  btcPrice: string;
  priceAt: Int32;
  change: string;
  rank: Int32;
  numberOfMarkets: Int32;
  numberOfExchanges: Int32;
  allTimeHigh: {
    price: string;
    timestamp: Int32;
  };
  supply: {
    confirmed: boolean;
    supplyAt: Int32;
    circulating: string;
    total: string;
    max: string;
  };
};
