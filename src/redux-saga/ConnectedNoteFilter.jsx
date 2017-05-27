import React from 'react'
import { connect } from 'react-redux'

import NoteFilter from '../vanilla/NoteFilter'
import { getFilter } from './selectors'
import { persistAndSetFilter } from './actions/filter'

const mapStateToProps = (state) => {
  return {
    value: getFilter(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (filter) => {
      dispatch(persistAndSetFilter(filter))
    },
    onReset: () => {
      dispatch(persistAndSetFilter(''))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteFilter)
