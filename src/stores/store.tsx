import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {reducer as cryptoReducer} from './reducers/cryptoReducer'
import {reducer as accountReducer} from './reducers/accountReducer'

const rootReducer = combineReducers({
    crypto: cryptoReducer,
    account: accountReducer
})

const store = configureStore({
    reducer: rootReducer
})

export {store};