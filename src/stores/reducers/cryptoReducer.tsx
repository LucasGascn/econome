import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {CryptoType} from '../../Utils/Interfaces';
import {url} from '../../Utils/Helper';

import axios from 'axios';
import {getWallet, setWallet} from '../../Utils/AsyncStorage';
import {StoreDispatch} from '../Store';

export interface CryptoWallet {
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
export const loadWallet = async (email: string, dispatch: StoreDispatch) => {
  const JsonWallet = await getWallet(email);
  if (JsonWallet) {
    const wallet = JSON.parse(JsonWallet);
    dispatch(actions.loadWalletData(wallet));
  } else {
    return {};
  }
};

const slice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    buyOrSellCrypto: (
      state,
      action: PayloadAction<{
        email: string;
        uuid: string;
        symbol: string;
        amount: number;
        usd: number;
      }>,
    ) => {
      const {email, uuid, symbol, amount, usd} = action.payload;
      state.money += usd;
      if (state.cryptoWallet[uuid]) {
        state.cryptoWallet[uuid].amount += amount;
      } else {
        state.cryptoWallet[uuid] = {symbol: symbol, amount: amount};
      }

      setWallet(email, state.cryptoWallet);
    },

    loadWalletData: (state, action) => {
      state.cryptoWallet = action.payload;
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
