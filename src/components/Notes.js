import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = () => {
  const Context = useContext(noteContext);
  const {notes,addNote , deleteNote , editNote} = Context;
  return (
    <>
      <AddNote/>
      <div className='row my-4'>
        <h2>Your Notes</h2>
        {notes.map((note)=>{
          // sending note as a prop
          return <Noteitem note={note} key={note._id}/>
        })}
      </div>
    </>
  )
}

export default Notes
