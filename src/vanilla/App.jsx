import React from 'react'
import autoBind from 'react-autobind'

import style from './App.css'
import AddNote from './AddNote'
import NoteFilter from './NoteFilter'
import NoteList from './NoteList'
import { filterNotes, nextNoteId } from './utils'

class App extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      notes: props.notes,
      filter: ''
    }

    autoBind(this)
  }

  addNote (note) {
    this.setState(prevState => ({
      notes: [
        ...prevState.notes,
        {
          ...note,
          id: nextNoteId(prevState.notes),
          done: false
        }
      ]
    }))
  }

  removeNote (id) {
    this.setState(prevState => ({
      notes: prevState.notes.filter(note => note.id !== id)
    }))
  }

  setFilter (filter) {
    if (this.state.filter !== filter) {
      this.setState({ filter })
    }
  }

  resetFilter () {
    this.setFilter('')
  }

  toggleNoteDone (id) {
    this.setState(prevState => ({
      notes: prevState.notes.map(note => {
        if (note.id === id) {
          return {
            ...note,
            done: !note.done
          }
        } else {
          return note
        }
      })
    }))
  }

  render () {
    return (
      <div className={style.root}>

        <div className={style.header}>

          <AddNote onAdd={this.addNote} />

          <NoteFilter value={this.state.filter}
            onChange={this.setFilter}
            onReset={this.resetFilter} />

        </div>

        <NoteList notes={filterNotes(this.state.notes, this.state.filter)}
          onDoneToggle={this.toggleNoteDone}
          onRemove={this.removeNote}
          onTagClick={this.setFilter} />

        {__DEV__ && console.log('<App> component state', this.state)}

      </div>
    )
  }

}

App.propTypes = {
  notes: NoteList.propTypes.notes
}

export default App
