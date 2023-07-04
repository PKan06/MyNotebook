import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props)=>{    
    // these the list of nodes which we have fetched 
    const note = [
    {
              "_id": "649dfbd378a12db23434193b1",
              "user": "649c93dcb4a051ba2d3b3d99",
              "title": "Morning routine",
              "description": "Wake up at 4 am and go for workout",
              "tag": "Physical Goal",
              "date": "2023-06-29T21:46:59.543Z",
              "__v": 0
            },
            {
              "_id": "649dfc2078a12db23434193d2",
              "user": "649c93dcb4a051ba2d3b3d99",
              "title": "Evening with a fixed routine",
              "description": "Wake up at 4 am and go for workout",
              "tag": "Physical Goal",
              "date": "2023-06-29T21:48:16.492Z",
              "__v": 0
            },
            {
              "_id": "649dfc2078a12db23434193f3",
              "user": "649c93dcb4a051ba2d3b3d99",
              "title": "Morning routine",
              "description": "Wake up at 4 am and go for workout",
              "tag": "Physical Goal",
              "date": "2023-06-29T21:48:16.687Z",
              "__v": 0
            },
            {
              "_id": "649dfc2078a12db2343419414",
              "user": "649c93dcb4a051ba2d3b3d99",
              "title": "Afternoon routine",
              "description": "Wake up at 4 am and go for workout",
              "tag": "Physical Goal",
              "date": "2023-06-29T21:48:16.830Z",
              "__v": 0
            },
            {
              "_id": "649dfc2178a12db2343419435",
              "user": "649c93dcb4a051ba2d3b3d99",
              "title": "Morning routine",
              "description": "Wake up at 4 am and go for workout",
              "tag": "Physical Goal",
              "date": "2023-06-29T21:48:17.012Z",
              "__v": 0
            }
    ]
    const [notes, setnote] = useState(note); // we have defined a state which we can fetch to other component from context 

    // Add a Note
    const addNote = (title, description , tag)=>{
      console.log("adding a new note");
      const note = {
        "_id": "649dfc2178a12db234341948",
        "user": "649c93dcb4a051ba2d3b3d99",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2023-06-29T21:48:17.012Z",
        "__v": 0
      }
      setnote(notes.concat(note)); // it will return an new arry which is haing old data + new one 
    }
    
    // Delete a Note 
    const deleteNote = (noteID)=>{
        console.log(`Deleting the node ${noteID}`);
        const newNotes = note.filter((item) =>
        {
          console.log(item._id !== noteID);
          return (item._id !== noteID)
        });
        setnote(newNotes);
        console.log(newNotes);
    }
    
    // Update a Note 
    const editNote = (id, title, description , tag)=>{
        console.log(`updating the note having id : ${id}`);
    }

    return (
        // ginving state and update state as an parameter so that it can be access by files b/w them 
        <NoteContext.Provider value={{notes,addNote , deleteNote , editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

// eslint-disable-next-line
export default NoteState;