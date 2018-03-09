import 'regenerator-runtime/runtime';
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './src/ducks';
import Router from './src/Router/container';
import rootSaga from './src/sagas';

const sagaMiddleware = createSagaMiddleware();

function configureStore(initialState) {
    const enhancer = compose(applyMiddleware(sagaMiddleware));
    return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});
sagaMiddleware.run(rootSaga);

class App extends Component {
    render() {
        return (
            <Provider store={ store }>
                <Router />
            </Provider>
        );
    }
}

console.disableYellowBox = true;

export default App;
