import { call, put, takeEvery } from 'redux-saga/effects'

import localApi, { KEY_FILTER } from '../api/local'

import { TYPE_INIT_FILTER, TYPE_PERSIST_AND_SET_FILTER, setFilter } from '../actions/filter'

function* initFilterSaga () {
  const filter = yield call(localApi.getFromLocalStorage, KEY_FILTER)

  if (filter) {
    yield put(setFilter(filter))
  }
}

function* persistAndSetFilterSaga (action) {
  const { filter } = action.payload

  yield call(localApi.setIntoLocalStorage, KEY_FILTER, filter)
  yield put(setFilter(filter))
}

export default function* () {
  yield takeEvery(TYPE_INIT_FILTER, initFilterSaga)
  yield takeEvery(TYPE_PERSIST_AND_SET_FILTER, persistAndSetFilterSaga)
}
