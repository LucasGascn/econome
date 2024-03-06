import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {reducer as cryptoReducers} from './reducers/cryptoReducers'

const rootReducer = combineReducers({
    crypto: cryptoReducers
})

const store = configureStore({
    reducer: rootReducer
})

export {store};