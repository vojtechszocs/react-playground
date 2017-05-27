import { TYPE_CLEAR_ERRORS } from '../actions/errors'

import {
  TYPE_LOADING_NOTES_FAILED,
  TYPE_ADDING_NOTE_FAILED,
  TYPE_REMOVING_NOTE_FAILED,
  TYPE_TOGGLING_NOTE_FAILED
} from '../actions/notes'

const getErrorMessage = (error) => (
  error.message ? error.message : '(no details available)'
)

const errors = (state = [], action) => {
  switch (action.type) {

    case TYPE_CLEAR_ERRORS:
      return []

    case TYPE_LOADING_NOTES_FAILED:
    case TYPE_ADDING_NOTE_FAILED:
    case TYPE_REMOVING_NOTE_FAILED:
    case TYPE_TOGGLING_NOTE_FAILED:
      return [
        ...state,
        `API call failed: ${getErrorMessage(action.payload.error)}`
      ]

    default:
      return state

  }
}

export default errors
