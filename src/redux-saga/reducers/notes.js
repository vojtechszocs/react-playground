import {
  TYPE_LOADING_NOTES_SUCCEEDED,
  TYPE_ADDING_NOTE_SUCCEEDED,
  TYPE_REMOVING_NOTE_SUCCEEDED,
  TYPE_TOGGLING_NOTE_SUCCEEDED
} from '../actions/notes'

const note = (state, action) => {
  switch (action.type) {

    case TYPE_ADDING_NOTE_SUCCEEDED:
      const { id, text, tags } = action.payload.note
      return {
        id, text, tags, done: false
      }

    case TYPE_TOGGLING_NOTE_SUCCEEDED:
      if (state.id === action.payload.id) {
        return {
          ...state,
          done: !state.done
        }
      } else {
        return state
      }

    default:
      return state

  }
}

const notes = (state = [], action) => {
  switch (action.type) {

    case TYPE_LOADING_NOTES_SUCCEEDED:
      return [
        ...action.payload.notes
      ]

    case TYPE_ADDING_NOTE_SUCCEEDED:
      return [
        ...state,
        note(undefined, action)
      ]

    case TYPE_REMOVING_NOTE_SUCCEEDED:
      return state.filter(n => n.id !== action.payload.id)

    case TYPE_TOGGLING_NOTE_SUCCEEDED:
      return state.map(n => note(n, action))

    default:
      return state

  }
}

export default notes
