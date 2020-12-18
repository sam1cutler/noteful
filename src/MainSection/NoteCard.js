import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import { format } from 'date-fns'
import './NoteCard.css';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';

class NoteCard extends Component {

    static defaultProps = {
        cardInfo: {
            id: '',
            name: '',
            modified: '',
            folderId: '',
            content: '',
        }
    }

    static contextType = NotesContext;

    handleDeleteNote = (event) => {

        event.preventDefault();
        const noteId = this.props.cardInfo.id

        fetch(`http://localhost:9090/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })  
            .then(response => {
                if (!response.ok) {
                    throw new Error('Something went wrong with note delete request.')
                }
                return response.json()
            })
            .then( () => {
                this.context.deleteNote(noteId)
                this.props.onDeleteNote()
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    render() {

        const { cardInfo } = this.props

        return (
            <div className='note-card'>
                <Link 
                    to={`/note/${cardInfo.name}`}
                    className='card-title'>
                        <h2>{cardInfo.name}</h2>
                </Link>

                <div className='card-info-container'>
                    <div>
                        {cardInfo.modified}
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
        id: PropTypes.string,
        name: PropTypes.string,
        modified: PropTypes.string,
        folderId: PropTypes.string,
        content: PropTypes.string,
    })
}