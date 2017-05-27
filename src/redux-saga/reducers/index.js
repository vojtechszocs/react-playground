import { combineReducers } from 'redux'

import notes from './notes'
import filter from './filter'
import errors from './errors'

const rootReducer = combineReducers({
  notes, filter, errors
})

export default rootReducer
