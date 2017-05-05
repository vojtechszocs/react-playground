import React from 'react'
import ReactDOM from 'react-dom'

import style from './vanilla-react-app.css'
import testData from '../tools/test-data.json'
import AddNote from './components-simple/AddNote'
import NoteList from './components-simple/NoteList'

const testNotes = testData.notes
let nextId = testNotes.length > 0 ? Math.max.apply(Math, testNotes.map(note => note.id)) + 1 : 1

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      notes: props.notes || []
    }
  }

  render() {
    return (
      <div className={style.root}>

        <h1>Notes</h1>

        <AddNote onAdd={note => {
          this.setState(prevState => ({
            notes: prevState.notes.concat({ ...note, id: nextId++ })
          }))
        }} />

        <NoteList notes={this.state.notes} />

      </div>
    )
  }

}

ReactDOM.render(
  <App notes={testNotes} />,
  document.getElementById('app')
)
