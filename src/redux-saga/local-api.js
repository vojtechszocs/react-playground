export const KEY_FILTER = 'FILTER'

const localApi = {

  setIntoLocalStorage (key, value) {
    localStorage.setItem(key, value)
  },

  getFromLocalStorage (key) {
    return localStorage.getItem(key)
  }

}

export default localApi
