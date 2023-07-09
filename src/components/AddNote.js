import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (Props) => {
    const Context = useContext(noteContext);
    const {addNote} = Context;
    const {showAlert} = Props;
    // defining a new state variable 
    const[note, setNote] = useState({title: "", description: "",tag: ""})
    
    const handelClick = (e)=>{
        e.preventDefault(); // not to reload the page while click on submit 
        addNote(note.title, note.description , note.tag);
        showAlert("Congratulations!! Added a new notes","success");
        setNote({title: "", description: "",tag: ""});
    }
    const onChange = (e)=>{
        // update the node dynemicaly 
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div>
        <div className='container my-4'>
        <h2>Add a Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' value={note.title} placeholder='Add a title at lest 5 characters long' onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name = "tag" value={note.tag} placeholder='Add a tag at lest 3 characters long' onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name = "description" value={note.description} placeholder='Add a description at lest 5 characters long' onChange={onChange} minLength={5} required/>
          </div>
          <button disabled={note.title.length < 5 || note.description.length < 5 || note.tag.length < 3} type="submit" className="btn btn-primary" onClick = {handelClick}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
