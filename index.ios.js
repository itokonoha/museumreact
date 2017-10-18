import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk';
import MyApp from './src/router';
import reducer from './src/store/store';
import { AsyncStorage } from 'react-native';

class Tourizen extends Component {
  render() {
    console.disableYellowBox = true;
  const store = createStore(
    reducer,
    undefined,
    compose(
      applyMiddleware(ReduxThunk),
      autoRehydrate()
    )
  )
  persistStore(store, { storage: AsyncStorage });

    return (
        <Provider store={store}>
          <MyApp />
        </Provider>
    );
  }
}

AppRegistry.registerComponent('Tourizen', () => Tourizen);
