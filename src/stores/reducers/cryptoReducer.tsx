import {createSlice} from '@reduxjs/toolkit';
import {Crypto, CryptoDetail} from '../../Utils/Interfaces.js';
import {url} from '../../Utils/helper.js';
import axios from 'axios';

type InitialState = {
    cryptosList: Crypto[],
    boughtCryptos: CryptoDetail[]
}

const initialState: InitialState = {
    cryptosList: [],
    boughtCryptos: []
}

const slice = createSlice({
    name: 'cryptos',
    initialState,
    reducers: {
        setCryptosList: (state, action) => {
            state.cryptosList = action.payload;
        },
        addBoughtCrypto: (state, action) => {
            state.boughtCryptos = [...state.boughtCryptos, action.payload]
        },
        sellBoughtCrypto: (state, action) => {
            state.boughtCryptos = state.boughtCryptos.filter((crypto: CryptoDetail) => crypto.id !== action.payload);
        }
    },
  },
});

const {reducer, actions} = slice;

export {reducer, actions};
