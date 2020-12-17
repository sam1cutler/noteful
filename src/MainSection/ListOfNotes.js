import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './ListOfNotes.css';
import NotesContext from '../NotesContext';
import NoteCard from './NoteCard';

class ListOfNotes extends Component {

    static defaultProps = {
        match: {
            params: {}
        }
    }

    static contextType = NotesContext
    
    filterListOfNotes(allNotes, currentFolderId) {
        let outputNotes = []
        if (currentFolderId) {
            outputNotes = allNotes.filter(note =>
                note.folderId === currentFolderId)
        } else {
          outputNotes = allNotes;
        }
        return outputNotes
    }

    render() {

        const allCurrentNotes = this.context.notes

        const relevantNotes = this.filterListOfNotes(
            allCurrentNotes, this.props.match.params.folderId);
        
        const cardList = relevantNotes.map( (activeNote, i) => {

            return (
                <NoteCard
                    key={i}
                    cardInfo={activeNote}
                />
            )
        })

        return (
            <div className='notes-list-container'>
                {cardList}
                <NavLink
                    to={'/AddNote'}
                    className='add-note-button'>
                        Add Note
                </NavLink>
            </div>
        )
    }
}

export default ListOfNotes;