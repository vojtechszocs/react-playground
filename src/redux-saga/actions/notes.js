export const TYPE_LOADING_NOTES = 'LOADING_NOTES'
export const loadingNotes = () => ({
  type: TYPE_LOADING_NOTES
})

export const TYPE_LOADING_NOTES_SUCCEEDED = 'LOADING_NOTES_SUCCEEDED'
export const loadingNotesSucceeded = (notes) => ({
  type: TYPE_LOADING_NOTES_SUCCEEDED,
  payload: {
    notes
  }
})

export const TYPE_LOADING_NOTES_FAILED = 'LOADING_NOTES_FAILED'
export const loadingNotesFailed = (error) => ({
  type: TYPE_LOADING_NOTES_FAILED,
  payload: {
    error
  }
})

export const TYPE_ADDING_NOTE = 'ADDING_NOTE'
export const addingNote = (note) => ({
  type: TYPE_ADDING_NOTE,
  payload: {
    note
  }
})

export const TYPE_ADDING_NOTE_SUCCEEDED = 'ADDING_NOTE_SUCCEEDED'
export const addingNoteSucceeded = (note) => ({
  type: TYPE_ADDING_NOTE_SUCCEEDED,
  payload: {
    note
  }
})

export const TYPE_ADDING_NOTE_FAILED = 'ADDING_NOTE_FAILED'
export const addingNoteFailed = (error) => ({
  type: TYPE_ADDING_NOTE_FAILED,
  payload: {
    error
  }
})

export const TYPE_REMOVING_NOTE = 'REMOVING_NOTE'
export const removingNote = (id) => ({
  type: TYPE_REMOVING_NOTE,
  payload: {
    id
  }
})

export const TYPE_REMOVING_NOTE_SUCCEEDED = 'REMOVING_NOTE_SUCCEEDED'
export const removingNoteSucceeded = (id) => ({
  type: TYPE_REMOVING_NOTE_SUCCEEDED,
  payload: {
    id
  }
})

export const TYPE_REMOVING_NOTE_FAILED = 'REMOVING_NOTE_FAILED'
export const removingNoteFailed = (error) => ({
  type: TYPE_REMOVING_NOTE_FAILED,
  payload: {
    error
  }
})

export const TYPE_TOGGLING_NOTE = 'TOGGLING_NOTE'
export const togglingNote = (id) => ({
  type: TYPE_TOGGLING_NOTE,
  payload: {
    id
  }
})

export const TYPE_TOGGLING_NOTE_SUCCEEDED = 'TOGGLING_NOTE_SUCCEEDED'
export const togglingNoteSucceeded = (id) => ({
  type: TYPE_TOGGLING_NOTE_SUCCEEDED,
  payload: {
    id
  }
})

export const TYPE_TOGGLING_NOTE_FAILED = 'TOGGLING_NOTE_FAILED'
export const togglingNoteFailed = (error) => ({
  type: TYPE_TOGGLING_NOTE_FAILED,
  payload: {
    error
  }
})
