import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import style from './Note.css'

const Note = ({ text, tags = [], done = false, onDoneToggleClick, onRemoveClick, onTagClick }) => (

  <div className={classNames(style.root, {
    [style.rootDone]: done
  })}>

    <div className={style.textWithButtons}>

      <span className={classNames(style.text, {
        [style.textDone]: done
      })}>
        {text}
      </span>

      <button className={style.button} onClick={onRemoveClick}>Remove</button>

      <button className={style.button} onClick={onDoneToggleClick}>
        {!done ? 'Already did it' : 'Still need to do it'}
      </button>

    </div>

    {tags.slice().sort().map(tag => (
      <span key={tag} className={style.tag} onClick={() => onTagClick(tag)}>
        {tag}
      </span>
    ))}

  </div>

)

export const NoteDataShape = {
  text: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  done: PropTypes.bool
}

Note.propTypes = {
  ...NoteDataShape,
  onDoneToggleClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onTagClick: PropTypes.func.isRequired
}

export default Note
