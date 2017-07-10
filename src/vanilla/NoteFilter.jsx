import React from 'react'
import PropTypes from 'prop-types'

import style from './NoteFilter.css'

const NoteFilter = ({ value, onChange, onReset }) => (
  <div className={style.root}>

    <span>Find notes:</span>

    <input type='text' className={style.input}
      placeholder='Filter by text or tags'
      value={value}
      onChange={event => { onChange(event.target.value) }} />

    <button onClick={onReset} disabled={!value}>
      Reset
    </button>

  </div>
)

NoteFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
}

export default NoteFilter
