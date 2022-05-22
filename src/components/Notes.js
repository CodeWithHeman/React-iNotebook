import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
const Notes = () => {
    const ncontext = useContext(noteContext)
    const { notes, setNotes } = ncontext;
    return (
        <div>
            <div className='row my-3'>
                <h2>You Notes</h2>
                {
                    notes.map((note) => { return <NoteItem note={note} /> })
                }
            </div>
        </div>
    )
}

export default Notes
