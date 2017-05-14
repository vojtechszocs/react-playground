import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import testData from '../tools/test-data.json'
import rootReducer from './redux/reducers'
import App from './redux/App'

const initialState = {
  notes: testData.notes, // this should be fetched from remote API
  filter: '' // this should be fetched from browser's local storage
}

let middleware = []

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

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
