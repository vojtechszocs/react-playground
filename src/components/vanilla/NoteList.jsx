import React from 'react'
import PropTypes from 'prop-types'

import Note from './Note'

const NoteList = ({ notes }) => (
  <div>

    {notes.map(note => (
      <Note key={note.id} {...note} />
    ))}

  </div>
)

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    ...Note.propTypes,
    id: PropTypes.number.isRequired
  })).isRequired
}

export default NoteList
