import React from 'react'
import Note from './Notes'

const Home = (props) => {
  const {showAlert} = props;
  return (
    <div>
      <Note showAlert={showAlert}/>
    </div>
  )
}

export default Home
