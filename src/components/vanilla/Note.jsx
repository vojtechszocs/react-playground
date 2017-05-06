import React from 'react'
import PropTypes from 'prop-types'

import style from './Note.css'

const Note = ({ text, tags = [], onRemove }) => (
  <div className={style.root}>

    <div className={style.textWithButtons}>
      <span className={style.text}>{text}</span>
      <button className={style.removeButton}
              onClick={onRemove}>Remove</button>
    </div>

    {tags.map(tag => (
      <span key={tag} className={style.tag}>{tag}</span>
    ))}

  </div>
)

Note.propTypes = {
  text: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  onRemove: PropTypes.func.isRequired
}

export default Note
