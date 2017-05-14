import { TYPE_ADD_NOTE, TYPE_REMOVE_NOTE, TYPE_TOGGLE_NOTE } from '../actions'

const note = (state, action) => {
  switch (action.type) {

    case TYPE_ADD_NOTE:
      const { id, text, tags } = action.payload
      return {
        id, text, tags, done: false
      }

    case TYPE_TOGGLE_NOTE:
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

    case TYPE_ADD_NOTE:
      return [
        ...state,
        note(undefined, action)
      ]

    case TYPE_REMOVE_NOTE:
      return state.filter(n => n.id !== action.payload.id)

    case TYPE_TOGGLE_NOTE:
      return state.map(n => note(n, action))

    default:
      return state

  }
}

export default notes
