import { createSelector } from 'reselect'

import { filterNotes, nextNoteId } from '../vanilla/utils'

export const getNotes = (state) => state.notes
export const getFilter = (state) => state.filter

export const getFilteredNotes = createSelector(
  [ getNotes, getFilter ],
  (notes, filter) => filterNotes(notes, filter)
)

export const getNextNoteId = createSelector(
  [ getNotes ],
  (notes) => nextNoteId(notes)
)
