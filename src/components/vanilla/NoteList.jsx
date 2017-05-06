import React from 'react'
import PropTypes from 'prop-types'

import Note from './Note'

const NoteList = ({ notes, onNoteRemove, onTagClick }) => (
  <div>

    {notes.map(note => (
      <Note key={note.id} {...note}
            onRemove={() => onNoteRemove(note.id)}
            onTagClick={onTagClick} />
    ))}

  </div>
)

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string)
  })).isRequired,
  onNoteRemove: PropTypes.func.isRequired,
  onTagClick: PropTypes.func.isRequired
}

export default NoteList
