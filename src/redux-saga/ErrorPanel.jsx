import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import style from './ErrorPanel.css'
import { getErrors } from './selectors'
import { clearErrors } from './actions/errors'

const ErrorPanel = ({ errors, onClear }) => {
  const errorCount = errors.length
  const noErrors = errorCount === 0

  const onShow = () => {
    window.alert(errors.map((e, i) => `${i + 1}. ${e}`).join('\n'))
  }

  return (
    <div className={style.root}>

      <span>Errors:</span>

      <button className={style.button}
        onClick={onShow}
        disabled={noErrors}>
        Show ({errorCount})
      </button>

      <button className={style.button}
        onClick={onClear}
        disabled={noErrors}>
        Clear
      </button>

    </div>
  )
}

ErrorPanel.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClear: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    errors: getErrors(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClear: () => {
      dispatch(clearErrors())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorPanel)
