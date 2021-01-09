import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'
import './NoteCard.css';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';

class NoteCard extends Component {

    static defaultProps = {
        cardInfo: {
            id: '',
            name: '',
            modified: '2019-01-03T00:00:00.000Z',
            folderId: '',
            content: '',
        }
    }

    static contextType = NotesContext;

    handleDeleteNote = (event) => {

        event.preventDefault();
        const noteId = this.props.cardInfo.id

        fetch(`https://quiet-shore-95229.herokuapp.com/api/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })  
            .then(response => {
                if (!response.ok) {
                    throw new Error('Something went wrong with note delete request.')
                }
            })
            .then( () => {
                this.context.deleteNote(noteId)
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    render() {

        const { cardInfo } = this.props

        const newModified1 = new Date(cardInfo.modified);
        const newModified2 = format(newModified1, 'do MMM yyyy');

        return (
            <div className='note-card'>
                <Link 
                    to={`/note/${cardInfo.name}`}
                    className='card-title'>
                        <h2>{cardInfo.name}</h2>
                </Link>

                <div className='card-info-container'>
                    <div>
                        Modified: {newModified2}
                    </div>
                    <button
                        type='button' 
                        className='delete-button'
                        onClick={this.handleDeleteNote}>
                            Delete
                    </button>
                </div> 
            </div>
        )
    }
}

export default NoteCard;


NoteCard.propTypes = {
    cardInfo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        modified: PropTypes.string,
        folderId: PropTypes.string,
        content: PropTypes.string,
    })
}