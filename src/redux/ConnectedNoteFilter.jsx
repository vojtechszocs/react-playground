import React from 'react'
import { connect } from 'react-redux'

import NoteFilter from '../vanilla/NoteFilter'
import { getFilter } from './selectors'
import { setFilter } from './actions'

const mapStateToProps = (state) => {
  return {
    value: getFilter(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (filter) => {
      dispatch(setFilter(filter))
    },
    onReset: () => {
      dispatch(setFilter(''))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteFilter)
