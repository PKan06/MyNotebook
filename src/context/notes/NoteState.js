import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  // host of our api
  const host = "https://my-notebook-two.vercel.app";
  // these the list of nodes which we will fetched
  const note = [];
  const [notes, setnote] = useState(note); // we have defined a state which we can fetch to other component from context

  // get all Notes
  const getNote = async() => {
    let url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
    const json = await response.json();
    // console.log(json);
    setnote(json);
  };
  // Add a Note
  const addNote = async(title, description, tag) => {
    // TODO : API calls
    
    let url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title, description , tag}), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    // console.log(json);
    // console.log(`add a new note in db at id : ${json._id}`);
    
    let newNotes = JSON.parse(JSON.stringify(notes.concat(json))); 
    setnote(newNotes); // it will return an new arry which is haing old data + new one
    // getNote();
  };

  // Delete a Note
  const deleteNote = async(noteID) => {
    let url = `${host}/api/notes/deletenote/${noteID}`;
    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json);

    // console.log(`Deleting the node ${noteID}`);
    // const newNotes = note.filter((item) => {return item._id !== noteID;});
    // setnote(newNotes);
    getNote();
  };

  // Update a Note
  const editNote = async(id, title, description, tag) => {
    // TODO : API calls (using fetch api  )
    console.log(`Editing the note having id : ${id}`);

    // using fetch api
    // Example POST method implementation:
    let url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title, description , tag}), // body data type must match "Content-Type" header
    });
    
    const json = await response.json();
    console.log(json);

    // we cannot update notes directly using the notes itself 
    // so we need a copy od the json string to store it
    let newNotes = JSON.parse(JSON.stringify(notes)); 
    // logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = notes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description =description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnote(newNotes);
  };

  return (
    // ginving state and update state as an parameter so that it can be access by files b/w them
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};

// eslint-disable-next-line
export default NoteState;
