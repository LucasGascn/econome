import {createSlice} from '@reduxjs/toolkit';
import { AccountDetail } from "../../interfaces.tsx";

const slice = createSlice({
    name: 'account',
    initialState: {
        loggedInUser: {
            nom: "",
            prenom: "",
            email: "",
            password: ""
        },
        wallet: 100
    },
    reducers: {
        setAccountData: (state, action) => {
            state.loggedInUser = action.payload;
        },
        reduceWalletAmount: (state, action) => {
            state.wallet -= action.payload
        },
        increaseWalletAmount: (state, action) => {
            state.wallet += action.payload
        }
    },
})

const {reducer, actions} = slice;

export {reducer, actions};