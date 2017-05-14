export const TYPE_ADD_NOTE = 'ADD_NOTE'
export const TYPE_REMOVE_NOTE = 'REMOVE_NOTE'
export const TYPE_TOGGLE_NOTE = 'TOGGLE_NOTE'
export const TYPE_SET_FILTER = 'SET_FILTER'

export const addNote = (id, text, tags) => {
  return {
    type: TYPE_ADD_NOTE,
    payload: {
      id, text, tags
    }
  }
}

export const removeNote = (id) => {
  return {
    type: TYPE_REMOVE_NOTE,
    payload: {
      id
    }
  }
}

export const toggleNote = (id) => {
  return {
    type: TYPE_TOGGLE_NOTE,
    payload: {
      id
    }
  }
}

export const setFilter = (filter) => {
  return {
    type: TYPE_SET_FILTER,
    payload: {
      filter
    }
  }
}
