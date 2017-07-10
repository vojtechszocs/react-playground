import { call, put, select, takeEvery } from 'redux-saga/effects'

import { reloadDataOnChange } from '../app-settings'
import dataTypes, { checkError } from '../data-types'
import { getNoteById } from '../selectors'
import remoteApi from '../api/remote'

import {
  TYPE_LOADING_NOTES, loadingNotesSucceeded, loadingNotesFailed,
  TYPE_ADDING_NOTE, addingNoteSucceeded, addingNoteFailed,
  TYPE_REMOVING_NOTE, removingNoteSucceeded, removingNoteFailed,
  TYPE_TOGGLING_NOTE, togglingNoteSucceeded, togglingNoteFailed
} from '../actions/notes'

const handleError = (apiError, apiResultValidator = () => undefined) => {
  if (apiError) {
    console.error('API call failed', apiError)
    return apiError
  }

  const validationError = apiResultValidator()
  if (validationError) {
    console.error('API result validation failed', validationError)
    return validationError
  }
}

function* loadNotesSaga () {
  let { result, error } = yield call(remoteApi.getNotes)
  error = handleError(error, () => checkError(dataTypes.Notes, result))

  if (error) {
    yield put(loadingNotesFailed(error))
    return
  }

  yield put(loadingNotesSucceeded(result))
}

function* addNoteSaga (action) {
  const { note } = action.payload

  let { result, error } = yield call(remoteApi.addNote, note)
  error = handleError(error, () => checkError(dataTypes.Note, result))

  if (error) {
    yield put(addingNoteFailed(error))
    return
  }

  if (reloadDataOnChange) {
    yield* loadNotesSaga()
  } else {
    yield put(addingNoteSucceeded(result))
  }
}

function* removeNoteSaga (action) {
  const { id } = action.payload

  let { error } = yield call(remoteApi.removeNote, id)
  error = handleError(error)

  if (error) {
    yield put(removingNoteFailed(error))
    return
  }

  if (reloadDataOnChange) {
    yield* loadNotesSaga()
  } else {
    yield put(removingNoteSucceeded(id))
  }
}

function* toggleNoteSaga (action) {
  const { id } = action.payload
  const note = yield select(getNoteById(id))
  const noteDone = (typeof note.done === 'boolean') ? note.done : false

  let { error } = yield call(remoteApi.updateNote, { ...note, done: !noteDone })
  error = handleError(error)

  if (error) {
    yield put(togglingNoteFailed(error))
    return
  }

  if (reloadDataOnChange) {
    yield* loadNotesSaga()
  } else {
    yield put(togglingNoteSucceeded(id))
  }
}

export default function* () {
  yield takeEvery(TYPE_LOADING_NOTES, loadNotesSaga)
  yield takeEvery(TYPE_ADDING_NOTE, addNoteSaga)
  yield takeEvery(TYPE_REMOVING_NOTE, removeNoteSaga)
  yield takeEvery(TYPE_TOGGLING_NOTE, toggleNoteSaga)
}
