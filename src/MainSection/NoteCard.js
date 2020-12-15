import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'
import './NoteCard.css';

class NoteCard extends Component {

    static defaultProps = {
        cardInfo: []
    }

    render() {

        const { cardInfo } = this.props

        const date = new Date(cardInfo.modified)
    
        return (
            <Link 
                to={`/note/${cardInfo.name}`}
                className='note-card'>
                    <h3>{cardInfo.name}</h3>
                    {format(date, 'Do MMM yyyy')}
            </Link>
        )

    }

}

export default NoteCard;