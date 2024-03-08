import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {reducer as cryptoReducer} from './reducers/CryptoReducer';
import {reducer as accountReducer} from './reducers/AccountReducer';

const rootReducer = combineReducers({
  crypto: cryptoReducer,
  account: accountReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type StoreDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof rootReducer>;

export default store;
