import { TYPE_SET_FILTER } from '../actions'

const filter = (state = '', action) => {
  switch (action.type) {

    case TYPE_SET_FILTER:
      return action.payload.filter

    default:
      return state

  }
}

export default filter
