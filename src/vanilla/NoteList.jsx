import React from 'react'
import PropTypes from 'prop-types'

import Note, { NoteDataShape } from './Note'

const NoteList = ({ notes, onDoneToggle, onRemove, onTagClick }) => (
  <div>

    {notes.map(note => (
      <Note key={note.id} {...note}
        onDoneToggleClick={() => onDoneToggle(note.id)}
        onRemoveClick={() => onRemove(note.id)}
        onTagClick={onTagClick} />
    ))}

  </div>
)

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    ...NoteDataShape,
    id: PropTypes.number.isRequired
  })).isRequired,
  onDoneToggle: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onTagClick: PropTypes.func.isRequired
}

export default NoteList
