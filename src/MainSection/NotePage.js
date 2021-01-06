import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
            note.name === this.props.match.params.noteName)
    
        return ( <> {currentNote ? 
            (<div>
                <NoteCard 
                    cardInfo={currentNote}
                    onDeleteNote={this.returnHomeAfterDelete}
                />
                <p>{currentNote.content}</p>
            </div>)
            : <Redirect 
                    to='/'
                />
        } </>

        )
    }
}

export default NotePage;