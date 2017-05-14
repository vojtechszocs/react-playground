import React from 'react'
import ReactDOM from 'react-dom'

import testData from '../tools/test-data.json'
import App from './vanilla/App'

const testNotes = testData.notes

ReactDOM.render(
  <App notes={testNotes} />,
  document.getElementById('app')
)
