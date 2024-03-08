import * as React from 'react';
import {Provider} from 'react-redux';
import store from './src/Stores/Store';
import NavigationRouter from './src/Navigation/NavigationRouter';

export default function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationRouter />
    </Provider>
  );
}
