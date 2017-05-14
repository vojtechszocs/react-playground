import React from 'react'
import { connect } from 'react-redux'

import style from '../vanilla/App.css'
import ConnectedAddNote from './ConnectedAddNote'
import ConnectedNoteFilter from './ConnectedNoteFilter'
import FilteredNoteList from './FilteredNoteList'

const App = () => (

  <div className={style.root}>

    <div className={style.header}>

      <ConnectedAddNote />

      <ConnectedNoteFilter />

    </div>

    <FilteredNoteList />

  </div>

)

export default App
