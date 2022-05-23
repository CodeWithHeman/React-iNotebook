import React, { useState } from "react";
import noteContext from "./noteContext";

//Arrow Funtions
const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);


    // Get all Notes
    const getNotes = async () => {
        // API Call        
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODhhNTZjZDhjZjJhMDcyNGRjYWQ1OSIsImlhdCI6MTY1MzEyMjQxMn0.PJvG-G1LGMgQjkwN-A9Qs1_onhOz3jDq2ecMZFe1BRM'
            }
        });
        const json = await response.json()
        setNotes(json);
    }

    // Add a Note
    const addNote = async (note) => {
        //delete note['regex'];      
        // API Call        
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODhhNTZjZDhjZjJhMDcyNGRjYWQ1OSIsImlhdCI6MTY1MzEyMjQxMn0.PJvG-G1LGMgQjkwN-A9Qs1_onhOz3jDq2ecMZFe1BRM'
            },
            body: JSON.stringify(note)
        });
        const addnote = await response.json();
        console.log('Adding Notes');
        setNotes(notes.concat(addnote));
    }

    // Delete a Note
    const deleteNote = async (id) => {
        console.log("Deleting a new note" + id);
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODhhNTZjZDhjZjJhMDcyNGRjYWQ1OSIsImlhdCI6MTY1MzEyMjQxMn0.PJvG-G1LGMgQjkwN-A9Qs1_onhOz3jDq2ecMZFe1BRM'
            }
        });
        const json = await response.json();
        console.log(json);
        const newNotes = notes.filter((n) => { return n._id !== id })
        setNotes(newNotes);
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API Call        
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODhhNTZjZDhjZjJhMDcyNGRjYWQ1OSIsImlhdCI6MTY1MzEyMjQxMn0.PJvG-G1LGMgQjkwN-A9Qs1_onhOz3jDq2ecMZFe1BRM'
            },
            body: JSON.stringify({ title, description, tag })
        })

        const json = await response.json();        
        // Logic to edit in client
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;
