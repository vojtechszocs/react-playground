import React from 'react'
import PropTypes from 'prop-types'

import style from './AddNote.css'

const AddNote = ({ onAdd }) => {
  let textInput, tagInput

  return (
    <div className={style.root}>

      <form onSubmit={event => {
        event.preventDefault()

        const text = textInput.value.trim()

        const tags = tagInput.value.trim()
          ? tagInput.value.split(',').filter(tag => tag.length > 0)
          : []

        if (text) {
          onAdd({ text, tags })
        }

        [textInput, tagInput].forEach(input => { input.value = '' })
      }}>

        <input type='text' className={style.input}
               placeholder='Enter some text here'
               ref={input => { textInput = input }} />

        <input type='text' className={style.input}
               placeholder='Tags, separated by commas (optional)'
               ref={input => { tagInput = input }} />

        <button type='submit'>Add Note</button>

      </form>

    </div>
  )
}

AddNote.propTypes = {
  onAdd: PropTypes.func.isRequired
}

export default AddNote
