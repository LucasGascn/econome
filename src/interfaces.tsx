export type Crypto = {
  id: string;
  name: string;
  symbol: string;
};

export type CryptoDetail = {
  current_price: Int32Array;
  id: string;
  image: string;
  name: string;
};

export type AccountDetail = {
  nom: string;
  prenom: string;
  email: string;
  password: string;
}