import {createSlice} from '@reduxjs/toolkit';
import { Crypto, CryptoDetail } from "../../interfaces.tsx";
import {url} from '../../api/helper.js';
import axios from 'axios';

const slice = createSlice({
    name: 'cryptos',
    initialState: {
        cryptosList: [],
        boughtCryptos: []
    },
    reducers: {
        setCryptosList: (state, action) => {
            state.cryptosList = action.payload;
        },
        addBoughtCrypto: (state, action) => {
            state.boughtCryptos = action.payload
        }
    },
})

const {reducer, actions} = slice;

export {reducer, actions};