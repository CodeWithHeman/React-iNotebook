import { useContext, useState, useEffect, useRef } from 'react';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
const Notes = () => {
    const ncontext = useContext(noteContext)
    const { notes, getNotes, editNote } = ncontext;

    //Initalize set with default value (empty)
    //const [note,setNote]=useState({etitle:'',edescription:'',etag:'default'})
    const [editnote, setEditNote] = useState({title:'',description:'',tag:'default'});

    useEffect(() => {
        getNotes();
        // eslint-desable-next-line
    }, []);

    const updateNote = (currentNote) => {
        setEditNote(currentNote);
        refEditModel.current.click();
    }

    const refEditModel = useRef(null);
    const refEditClose = useRef(null);

    //Arrow Fucntion
    const handleClick = (e) => {
        editNote(editnote._id, editnote.title, editnote.description, editnote.tag);
        refEditClose.current.click();
        setEditNote({title:'',description:'',tag:'default'})
    }

    const onChange = (e) => {
        //[e.target.name]:e.target.value means to say get the value from name attribute like name="description" | name="title"
        //Spread syntax (...) allows an iterable such as an array expression or string to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected.
        setEditNote({ ...editnote, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote />
            <button className="btn btn-primary d-none" ref={refEditModel} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" name="title" className="form-control" id="etitle" value={editnote.title} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea type="text" name="description" className="form-control" id="edescription" value={editnote.description} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" name="tag" className="form-control" id="etag" value={editnote.tag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refEditClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-5'>
                <h2>You Notes</h2>
                <hr/>
                {
                    notes.map((note) => { return <NoteItem key={note._id} updateNote={updateNote} note={note} /> })
                }
                <div className="container">
                    {notes.length == 0 && 'No notes to display'}
                </div>
            </div>
        </>
    )
}

export default Notes
