import 'whatwg-fetch'

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './redux-saga/reducers'
import rootSaga from './redux-saga/sagas'
import App from './redux-saga/App'

const initialState = {
  notes: [], // this will be fetched from remote API
  filter: '' // this will be fetched from browser's local storage
}

const sagaMiddleware = createSagaMiddleware()

let middleware = [sagaMiddleware]

if (__DEV__) {
  const { createLogger } = require('redux-logger')
  const loggerMiddleware = createLogger()

  middleware = [...middleware, loggerMiddleware]
  console.log('Redux app initial state', initialState)
}

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
)

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
