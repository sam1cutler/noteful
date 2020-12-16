import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import { format } from 'date-fns'
import './NoteCard.css';
import NotesContext from '../NotesContext';

class NoteCard extends Component {

    static defaultProps = {
        cardInfo: {
            name: ''
        },
        onDeleteNote: () => {},
    }

    static contextType = NotesContext;

    handleDeleteNote = (event) => {
        console.log('User requested to delete a note.')

        event.preventDefault();
        const noteId = this.props.cardInfo.id

        console.log(noteId)

        fetch(`http://localhost:9090/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })  
            .then(response => {
                console.log(response);
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

        
        //const date = new Date(cardInfo.modified)
        //console.log(cardInfo.name)
        //console.log(date)

        //const formattedDate = format(date, 'd MMM yyyy')
        //console.log(formattedDate)
        

        return (
            <div className='note-card'>
                <Link 
                    to={`/note/${cardInfo.name}`}
                    className='card-title'>
                        <h3>{cardInfo.name}</h3>
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