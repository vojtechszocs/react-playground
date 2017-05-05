import React from 'react'
import PropTypes from 'prop-types'

import style from './Note.css'

const Note = ({ text, tags = [] }) => (
  <div className={style.root}>

    <div className={style.text}>{text}</div>

    {tags.map(tag => (
      <span key={tag} className={style.tag}>{tag}</span>
    ))}

  </div>
)

Note.propTypes = {
  text: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string)
}

export default Note
