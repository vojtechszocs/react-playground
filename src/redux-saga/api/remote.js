import { apiBaseUrl } from '../app-settings'
import dataTypes, { validate } from '../data-types'

const jsonHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const checkResponseStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

const logResponse = ({ url, method }) => (response) => {
  if (__DEV__) {
    console.log(`${method} ${url}`, response)
  }
  return response
}

const callApi = ({ url, method, body }) => {
  return fetch(url, { method, body, headers: jsonHeaders })
    .then(checkResponseStatus)
    .then(response => response.json())
    .then(logResponse({ url, method }))
}

const transformResult = (promise) => (
  promise.then(result => ({ result })).catch(error => ({ error }))
)

const remoteApi = {

  getNotes () {
    return transformResult(
      callApi({
        url: `${apiBaseUrl}/notes`,
        method: 'GET'
      })
    )
  },

  addNote (note) {
    return transformResult(
      validate(dataTypes.Note, note)
        .then(() => callApi({
          url: `${apiBaseUrl}/notes`,
          method: 'POST',
          body: JSON.stringify(note)
        }))
    )
  },

  removeNote (id) {
    return transformResult(
      validate(dataTypes.ID, id)
        .then(() => callApi({
          url: `${apiBaseUrl}/notes/${id}`,
          method: 'DELETE'
        }))
    )
  },

  updateNote (note) {
    return transformResult(
      validate(dataTypes.Note, note)
        .then(() => callApi({
          url: `${apiBaseUrl}/notes/${note.id}`,
          method: 'PUT',
          body: JSON.stringify(note)
        }))
    )
  }

}

export default remoteApi
