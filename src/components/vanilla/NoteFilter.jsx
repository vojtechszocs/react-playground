import React from 'react'
import PropTypes from 'prop-types'

import style from './NoteFilter.css'

const NoteFilter = ({ onChange }) => {
  function resetFilter (input) {
    if (input.value) {
      input.value = ''
      onChange(input.value)
    }
  }

  return (
    <div className={style.root}>

      <span>Find notes (ESC to reset):</span>

      <input type='text' className={style.input}
             placeholder='Filter by text or tags'
             onChange={event => { onChange(event.target.value) }}
             onKeyUp={event => { event.keyCode === 27 && resetFilter(event.target) }}/>

    </div>
  )
}

NoteFilter.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default NoteFilter
