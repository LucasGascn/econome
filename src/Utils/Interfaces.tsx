export type CryptoType = {
  uuid: string;
  symbol: string;
  name: string;
  color: string;
  iconUrl: string;
  price: string;
  change: string;
  rank: number;
  btcPrice: string;
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
  priceAt: number;
  change: string;
  rank: number;
  numberOfMarkets: number;
  numberOfExchanges: number;
  allTimeHigh: {
    price: string;
    timestamp: number;
  };
  supply: {
    confirmed: boolean;
    supplyAt: number;
    circulating: string;
    total: string;
    max: string;
  };
};
export type AccountDetail = {
  nom: string;
  prenom: string;
  email: string;
  password: string;
};

export type RootStackParamList = {
  MainTab: undefined;
  MainStack: undefined;
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  Wallet: undefined;
  CryptoDetail: {id: string};
};
