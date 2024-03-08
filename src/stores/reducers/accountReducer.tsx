import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'account',
  initialState: {
    loggedInUser: {
      nom: null,
      prenom: null,
      email: null,
      password: null,
    },
  },
  reducers: {
    setAccountData: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
});

const {reducer, actions} = slice;

export {reducer, actions};
