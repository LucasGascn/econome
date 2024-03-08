import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {CryptoType} from '../../Utils/Interfaces';
import {url} from '../../Utils/Helper';

import axios from 'axios';

interface CryptoWallet {
  [uuid: string]: {
    amount: number;
    symbol: string;
  };
}

interface CryptoState {
  cryptoList: CryptoType[];
  cryptoWallet: CryptoWallet;
  money: number;
}

const initialState: CryptoState = {
  cryptoList: [],
  cryptoWallet: {},
  money: 100,
};

export const getCryptos = createAsyncThunk('account/getCryptos', async () => {
  const response = await axios.get(url('coins'));
  return response.data.data.coins;
});

const slice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    buyOrSellCrypto: (
      state,
      action: PayloadAction<{
        uuid: string;
        symbol: string;
        amount: number;
        usd: number;
      }>,
    ) => {
      const {uuid, symbol, amount, usd} = action.payload;
      state.money += usd;
      if (state.cryptoWallet[uuid]) {
        state.cryptoWallet[uuid].amount += amount;
      } else {
        state.cryptoWallet[uuid] = {symbol: symbol, amount: amount};
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getCryptos.fulfilled, (state, action) => {
      state.cryptoList = action.payload;
    });
  },
});

const {reducer, actions} = slice;

export {reducer, actions};
