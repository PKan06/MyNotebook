import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext';

const About = ()=> {
    const a = useContext(noteContext);
    useEffect(()=>{
        a.update(); // this will eun the update function till 1sec as set by us earlier
        // making it like componentDeMount using the below comment
        // eslint-disable-next-line
    },[])

    return (
        <div>
            This is a About {a.state.name} and he is in class {a.state.class}
        </div>
    )
}

export default About
