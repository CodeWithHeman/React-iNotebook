import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
    const ncontext = useContext(noteContext);
    const {addNote}=ncontext;

    //Initalize set with default value (empty)
    const [note,setNote]=useState({title:'',description:'',tag:''})

    //Arrow Fucntion
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note);
        setNote({title:'',description:'',tag:'default'});
    }

    const onChange=(e)=>{
        //[e.target.name]:e.target.value means to say get the value from name attribute like name="description" | name="title"

        //Spread syntax (...) allows an iterable such as an array expression or string to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected.

        setNote({...note,[e.target.name]:e.target.value})
    }

  return (
    <div className='container my-3'>
        <h2>Add a Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" name="title" className="form-control" id="title" value={note.title} onChange={onChange} />            
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea type="text" name="description" className="form-control" id="description" value={note.description}  onChange={onChange} />            
          </div>  
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" name="tag" className="form-control" id="tag" value={note.tag}  onChange={onChange} />            
          </div>        
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div> 
  )
}

export default AddNote

