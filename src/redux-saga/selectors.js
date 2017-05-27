import { createSelector } from 'reselect'

import { filterNotes, nextNoteId } from '../vanilla/utils'

export const getNotes = (state) => state.notes
export const getFilter = (state) => state.filter
export const getErrors = (state) => state.errors

export const getFilteredNotes = createSelector(
  [ getNotes, getFilter ],
  filterNotes
)

export const getNextNoteId = createSelector(
  [ getNotes ],
  nextNoteId
)

export const getNoteById = (id) => createSelector(
  [ getNotes ],
  (notes) => notes.find(n => n.id === id)
)
