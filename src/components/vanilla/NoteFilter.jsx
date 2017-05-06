import React from 'react'
import PropTypes from 'prop-types'

import style from './NoteFilter.css'

const NoteFilter = ({ onChange }) => (
  <div className={style.root}>

    <span>Find notes:</span>

    <input type='text' className={style.input}
           placeholder='Filter by text or tags'
           onChange={event => { onChange(event.target.value) }} />

  </div>
)

NoteFilter.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default NoteFilter
