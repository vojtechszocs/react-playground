import React from 'react'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'

import style from './App.css'
import AddNote from './AddNote'
import NoteFilter from './NoteFilter'
import NoteList from './NoteList'

class App extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      notes: props.notes,
      filter: ''
    }

    autoBind(this)
  }

  filterNotes ({ notes, filter }) {
    if (!filter) {
      return notes
    }

    return notes.filter(note => {
      const text = note.text
      const tags = note.tags || []

      return text.includes(filter) || tags.some(tag => tag.includes(filter))
    })
  }

  setFilter (filter) {
    this.setState({ filter })
  }

  addNote (note) {
    this.setState(prevState => ({
      notes: prevState.notes.concat({
        ...note,
        id: this.props.getNextId()
      })
    }))
  }

  removeNote (id) {
    this.setState(prevState => ({
      notes: prevState.notes.filter(note => note.id !== id)
    }))
  }

  render () {
    return (
      <div className={style.root}>

        <div className={style.header}>

          <AddNote onAdd={this.addNote} />

          <NoteFilter onChange={this.setFilter} />

        </div>

        <NoteList notes={this.filterNotes(this.state)}
                  onNoteRemove={this.removeNote} />

        {__DEV__ && console.log('<App> state', this.state)}

      </div>
    )
  }

}

App.propTypes = {
  notes: NoteList.propTypes.notes,
  getNextId: PropTypes.func.isRequired
}

export default App
