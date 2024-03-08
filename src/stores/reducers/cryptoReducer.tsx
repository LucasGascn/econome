import {createSlice} from '@reduxjs/toolkit';
import {Crypto, CryptoDetail} from '../../Utils/Interfaces.js';
import {url} from '../../Utils/helper.js';
import axios from 'axios';

const slice = createSlice({
  name: 'cryptos',
  initialState: {
    cryptosList: [],
    boughtCryptos: [],
  },
  reducers: {
    setCryptosList: (state, action) => {
      state.cryptosList = action.payload;
    },
    addBoughtCrypto: (state, action) => {
      state.boughtCryptos = action.payload;
    },
  },
});

const {reducer, actions} = slice;

export {reducer, actions};
