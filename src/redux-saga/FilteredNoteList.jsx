import React from 'react'
import { connect } from 'react-redux'

import NoteList from '../vanilla/NoteList'
import { getFilteredNotes } from './selectors'
import { togglingNote, removingNote } from './actions/notes'
import { persistAndSetFilter } from './actions/filter'

const mapStateToProps = (state) => {
  return {
    notes: getFilteredNotes(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDoneToggle: (id) => {
      dispatch(togglingNote(id))
    },
    onRemove: (id) => {
      dispatch(removingNote(id))
    },
    onTagClick: (tag) => {
      dispatch(persistAndSetFilter(tag))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList)
