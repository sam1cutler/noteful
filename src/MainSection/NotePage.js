import React, { Component } from 'react';
import './NotePage.css';
import NoteCard from './NoteCard';
import NotesContext from '../NotesContext';

class NotePage extends Component {

    static defaultProps = {
        noteInfo: []
    }

    static contextType = NotesContext

    returnHomeAfterDelete = () => {
        this.props.history.push('/')
    }

    render() {

        //console.log('In NotePage.js');
        //console.log(this.context)

        //console.log(this.props.match.params.noteName)

        const currentNote = this.context.notes.find(note =>
            note.name === this.props.match.params.noteName) || {}
        
        //console.log(currentNote)
    
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