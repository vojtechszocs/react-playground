import React from 'react'
import ReactDOM from 'react-dom'

import testData from '../tools/test-data.json'
import App from './components/vanilla/App'

const testNotes = testData.notes
let nextId = testNotes.length > 0 ? Math.max.apply(Math, testNotes.map(note => note.id)) + 1 : 1

ReactDOM.render(
  <App notes={testNotes} getNextId={() => nextId++} />,
  document.getElementById('app')
)
