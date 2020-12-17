import React, { Component } from 'react';
import './NotePage.css';
import NoteCard from './NoteCard';
import NotesContext from '../NotesContext';

class NotePage extends Component {

    static contextType = NotesContext

    returnHomeAfterDelete = () => {
        this.props.history.push('/')
    }

    render() {

        const currentNote = this.context.notes.find(note =>
            note.name === this.props.match.params.noteName) || {}
    
        return (
            <div>
                <NoteCard 
                    cardInfo={currentNote}
                    onDeleteNote={this.returnHomeAfterDelete}
                />
                <p>{currentNote.content}</p>
            </div>
        )
    }
}

export default NotePage;