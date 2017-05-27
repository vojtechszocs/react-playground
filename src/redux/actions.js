export const TYPE_ADD_NOTE = 'ADD_NOTE'
export const addNote = (note) => ({
  type: TYPE_ADD_NOTE,
  payload: {
    note
  }
})

export const TYPE_REMOVE_NOTE = 'REMOVE_NOTE'
export const removeNote = (id) => ({
  type: TYPE_REMOVE_NOTE,
  payload: {
    id
  }
})

export const TYPE_TOGGLE_NOTE = 'TOGGLE_NOTE'
export const toggleNote = (id) => ({
  type: TYPE_TOGGLE_NOTE,
  payload: {
    id
  }
})

export const TYPE_SET_FILTER = 'SET_FILTER'
export const setFilter = (filter) => ({
  type: TYPE_SET_FILTER,
  payload: {
    filter
  }
})
