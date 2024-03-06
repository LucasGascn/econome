import {createSlice} from '@reduxjs/toolkit';
import { Crypto } from "../interfaces.tsx";

const slice = createSlice({
    name: 'cryptos',
    initialState: {
        cryptos: Array<Crypto>,
        boughtCryptos: Array<Crypto>
    },
    reducers: {
        set: (state, action) => {
            state.cryptos = action.payload
        },
    }
})

const {reducer, actions} = slice;

export {reducer, actions};