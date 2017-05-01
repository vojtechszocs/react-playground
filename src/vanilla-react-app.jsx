import React from 'react'
import ReactDOM from 'react-dom'

const TestComponent = ({}) => (
  <div>It works.</div>
)

ReactDOM.render(
  <TestComponent />,
  document.getElementById('app')
)
