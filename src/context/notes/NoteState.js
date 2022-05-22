import React, { useState } from "react";
import noteContext from "./noteContext";

//Arrow Funtions
const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "6288cd6a2c2c457620c5e552",
            "user": "6288a56cd8cf2a0724dcad59",
            "title": "My title",
            "description": "Plese wake up early",
            "tag": "general",
            "date": "2022-05-21T11:30:50.684Z",
            "__v": 0
        },
        {
            "_id": "6288cde7ad4baae099297544",
            "user": "6288a56cd8cf2a0724dcad59",
            "title": "New Sticky Note 2",
            "description": "Please access the Stikcy Notes",
            "tag": "general",
            "date": "2022-05-21T11:32:55.391Z",
            "__v": 0
        },
        {
            "_id": "6288ce5aad4baae099297546",
            "user": "6288a56cd8cf2a0724dcad59",
            "title": "My title",
            "description": "Plese wake up early",
            "tag": "personal",
            "date": "2022-05-21T11:34:50.016Z",
            "__v": 0
        },
        {
            "_id": "6288ce5aad4baae099297548",
            "user": "6288a56cd8cf2a0724dcad59",
            "title": "My title",
            "description": "Plese wake up early",
            "tag": "personal",
            "date": "2022-05-21T11:34:50.471Z",
            "__v": 0
        }
    ]

    const [notes]=useState(notesInitial);

    return (
        <noteContext.Provider value={{ notes }}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;
