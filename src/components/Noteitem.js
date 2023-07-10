import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (prop) => {
  const { note, updateNote, showAlert} = prop;
  const Context = useContext(noteContext);
  const {deleteNote} = Context;
  return (
    <div className="col-md-3 my-3" >
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between">  
            <h5 className="card-title text-wrap" style={{width: 13 + 'rem'}} >{note.title}</h5>
            <i className="fa-solid fa-pen-to-square ml-2 " style={{color: "#51a96b"}} onClick={()=>{updateNote(note)}}></i>
            <i className="fa-sharp fa-solid fa-trash-can mx-2 " style={{color: "#df0b0b"}} onClick={()=>{deleteNote(note._id); showAlert("Deleted Successfully", "success")}}></i> 
            {/* added using fontwesome */}
          </div>
          <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
          <p className="card-text">
            {note.description}
          </p>
        </div> 
      </div>
    </div>
  );
};

export default Noteitem;
