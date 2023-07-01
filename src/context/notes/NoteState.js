import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props)=>{
    // state that has been ciculated over the whole dom wraped in NoteContext
    const s1 = {
        "name" : "We will rock",
        "class": "5b"
    }
    const [state, setSate] = useState(s1); // using state s1 to update it
    // updating the state using context api
    const update = ()=>{
        setTimeout(()=>{
            setSate({
                "name": "Rocking !!!",
                "class" : "10b"
            })
        }, 1000);
    }
    
    return (
        // ginving state and update state as an parameter so that it can be access by files b/w them 
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;