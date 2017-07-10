import React from 'react'
import PropTypes from 'prop-types'

import style from './AddNote.css'

const AddNote = ({ onAdd }) => {
  let textInput, tagInput

  const onFormSubmit = (event) => {
    event.preventDefault()

    const text = textInput.value.trim()

    let tags = tagInput.value.trim()
      ? tagInput.value.split(',').filter(tag => tag)
      : []

    tags = tags.filter((tag, index, self) => index === self.indexOf(tag))

    if (text) {
      onAdd({ text, tags })
    }

    for (const input of [textInput, tagInput]) {
      input.value = ''
    }
  }

  return (
    <div className={style.root}>

      <form onSubmit={onFormSubmit}>

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
