import React from 'react'

import style from '../vanilla/App.css'
import ConnectedAddNote from './ConnectedAddNote'
import ConnectedNoteFilter from './ConnectedNoteFilter'
import ErrorPanel from './ErrorPanel'
import FilteredNoteList from './FilteredNoteList'

const App = () => (

  <div className={style.root}>

    <div className={style.header}>

      <ConnectedAddNote />

      <ConnectedNoteFilter />

      <ErrorPanel />

    </div>

    <FilteredNoteList />

  </div>

)

export default App
