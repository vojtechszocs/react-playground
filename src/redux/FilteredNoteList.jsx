import React from 'react'
import { connect } from 'react-redux'

import NoteList from '../vanilla/NoteList'
import { getFilteredNotes } from './selectors'
import { toggleNote, removeNote, setFilter } from './actions'

const mapStateToProps = (state) => {
  return {
    notes: getFilteredNotes(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDoneToggle: (id) => {
      dispatch(toggleNote(id))
    },
    onRemove: (id) => {
      dispatch(removeNote(id))
    },
    onTagClick: (tag) => {
      dispatch(setFilter(tag))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList)
