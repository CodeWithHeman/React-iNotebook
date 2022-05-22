import React from 'react'

function NoteItem(props) {
    let { note } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam fugiat animi non quaerat nam id sint ab, excepturi vel doloremque accusamus inventore, fugit accusantium libero temporibus. Distinctio voluptates expedita eaque!</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
