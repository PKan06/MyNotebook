import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
    const Context = useContext(noteContext);
    const {addNote} = Context;

    // defining a new state variable 
    const[note, setNote] = useState({title: "", description: "",tag: "Default"})
    
    const handelClick = (e)=>{
        e.preventDefault(); // not to reload the page while click on submit 
        addNote(note.title, note.description , note.tag);
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div>
        <div className='container my-4'>
        <h2>Add a Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title'  onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name = "tag" onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name = "description" onChange={onChange}/>
          </div>
          <button type="submit" className="btn btn-primary" onClick = {handelClick}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
