import React, { Component } from 'react';
import './NoteSidebar.css';
import NotesContext from '../NotesContext';

class NoteSidebar extends Component {

    static contextType = NotesContext

    render() {

        const activeNote = this.context.notes.find(note => 
            note.name === this.props.match.params.noteName) || {}

        const activeFolderObject = this.context.folders.find(folder => 
            folder.id === activeNote.folder_id) || {}

        const activeFolder = activeFolderObject.name
       
        return (
            <div>
                <button className='back-button' onClick={() => this.props.history.goBack()}>
                    Go Back
                </button>
                <h3>Current folder: {activeFolder}</h3>
            </div>
        )
    }
}

export default NoteSidebar;