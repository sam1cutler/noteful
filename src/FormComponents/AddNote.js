import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import './AddNote.css';

class AddNote extends Component {

    static contextType = NotesContext;

    state = {
        error: null,
    };

    render() {

        return (

            <div>
                Placeholder AddNote Form
            </div>

        )

    }
}

export default AddNote;