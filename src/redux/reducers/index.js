import { combineReducers } from 'redux'

import notes from './notes'
import filter from './filter'

const rootReducer = combineReducers({
  notes, filter
})

export default rootReducer
