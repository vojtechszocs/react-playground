import { all, fork, put } from 'redux-saga/effects'

import notes from './notes'
import filter from './filter'
import { loadingNotes } from '../actions/notes'
import { initFilter } from '../actions/filter'

function* rootSaga () {
  yield all([
    fork(notes),
    fork(filter),
    put(loadingNotes()),
    put(initFilter())
  ])
}

export default rootSaga
