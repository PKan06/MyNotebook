import { useContext, useEffect ,useRef, useState} from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = () => {
  const Context = useContext(noteContext);
  const {notes,getNote, editNote} = Context;
  useEffect(()=>{
    getNote();
    // to use as componentDidmount
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refUpdate = useRef(null);
  const updateNotes = (CurrentNote)=>{
      ref.current.click(); // this function is use to open the modal using its button 
      // console.log("Button is clicked");
      // problem will only be resolved if we tell them that we are using mtitle insted of title here
      setNote({mid:CurrentNote._id, mtitle: CurrentNote.title , mdescription : CurrentNote.description, mtag : CurrentNote.tag});
  }

  const [note , setNote] = useState({mid:"",mtitle:"", mdescription: "",mtag: ""}); // new state for new form to fill for update notes 
  const handelClick = (e)=>{
    refUpdate.current.click();
    // e.preventDefault(); // not to reload the page while click on submit inside the form
    console.log(note); //-> this will show thw updated values of the notes 
    editNote(note.mid, note.mtitle , note.mdescription , note.mtag);
  }
  const onChange = (e)=>{
    // this function will take care of the updated notes 
    // as they are reflected in real time in react developer tools
      setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <>
      <AddNote/> 
      {/* to edit the noteitems */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="mtitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="mtitle" name='mtitle' value={note.mtitle}  onChange={onChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="mtag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="mtag" name = "mtag" value={note.mtag} onChange={onChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="mdescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="mdescription" name = "mdescription" value={note.mdescription} onChange={onChange}/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refUpdate} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick = {handelClick} >Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className='row my-4'>
        <h2>Your Notes</h2>
        {notes.map((note)=>{
          // sending note as a prop
          return <Noteitem note={note} key={note._id} updateNote = {updateNotes} />
        })}
      </div>
    </>
  )
}

export default Notes
