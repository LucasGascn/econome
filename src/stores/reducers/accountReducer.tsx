import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'account',
  initialState: {
    loggedInUser: {
      nom: '',
      prenom: '',
      email: '',
      password: '',
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
