import { call, put, select, takeEvery } from 'redux-saga/effects'

import dataTypes, { checkError } from '../data-types'
import { getNoteById } from '../selectors'
import remoteApi from '../remote-api'

import {
  TYPE_LOADING_NOTES, loadingNotesSucceeded, loadingNotesFailed,
  TYPE_ADDING_NOTE, addingNoteSucceeded, addingNoteFailed,
  TYPE_REMOVING_NOTE, removingNoteSucceeded, removingNoteFailed,
  TYPE_TOGGLING_NOTE, togglingNoteSucceeded, togglingNoteFailed
} from '../actions/notes'

function* handleDispatch (successActionCreator, errorActionCreator, { value, error }) {
  if (error) {
    __DEV__ && console.error(error)
    yield put(errorActionCreator(error))
  } else {
    yield put(successActionCreator(value))
  }
}

function* loadNotesSaga () {
  let { result, error } = yield call(remoteApi.getNotes)
  error = error || checkError(dataTypes.Notes, result)
  yield* handleDispatch(loadingNotesSucceeded, loadingNotesFailed, { value: result, error })
}

function* addNoteSaga (action) {
  const { note } = action.payload
  let { result, error } = yield call(remoteApi.addNote, note)
  error = error || checkError(dataTypes.Note, result)
  yield* handleDispatch(addingNoteSucceeded, addingNoteFailed, { value: result, error })
}

function* removeNoteSaga (action) {
  const { id } = action.payload
  const { error } = yield call(remoteApi.removeNote, id)
  yield* handleDispatch(removingNoteSucceeded, removingNoteFailed, { value: id, error })
}

function* toggleNoteSaga (action) {
  const { id } = action.payload
  const note = yield select(getNoteById(id))
  const noteDone = (typeof note.done === 'undefined') ? false : note.done
  const { error } = yield call(remoteApi.updateNote, { ...note, done: !noteDone })
  yield* handleDispatch(togglingNoteSucceeded, togglingNoteFailed, { value: id, error })
}

export default function* () {
  yield takeEvery(TYPE_LOADING_NOTES, loadNotesSaga)
  yield takeEvery(TYPE_ADDING_NOTE, addNoteSaga)
  yield takeEvery(TYPE_REMOVING_NOTE, removeNoteSaga)
  yield takeEvery(TYPE_TOGGLING_NOTE, toggleNoteSaga)
}
