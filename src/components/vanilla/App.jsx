import React from 'react'
import PropTypes from 'prop-types'

import style from './App.css'
import AddNote from './AddNote'
import NoteList from './NoteList'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      notes: props.notes
    }
  }

  render() {
    return (
      <div className={style.root}>

        <h1>Notes</h1>

        <AddNote onAdd={note => {
          this.setState(prevState => ({
            notes: prevState.notes.concat({
              ...note,
              id: this.props.getNextId()
            })
          }))
        }} />

        <NoteList notes={this.state.notes} />

      </div>
    )
  }

}

App.propTypes = {
  notes: NoteList.propTypes.notes,
  getNextId: PropTypes.func.isRequired
}

export default App
