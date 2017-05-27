export const TYPE_SET_FILTER = 'SET_FILTER'
export const setFilter = (filter) => ({
  type: TYPE_SET_FILTER,
  payload: {
    filter
  }
})

export const TYPE_INIT_FILTER = 'INIT_FILTER'
export const initFilter = () => ({
  type: TYPE_INIT_FILTER
})

export const TYPE_PERSIST_AND_SET_FILTER = 'PERSIST_AND_SET_FILTER'
export const persistAndSetFilter = (filter) => ({
  type: TYPE_PERSIST_AND_SET_FILTER,
  payload: {
    filter
  }
})
