import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import { format } from 'date-fns'
import './NoteCard.css';

class NoteCard extends Component {

    static defaultProps = {
        cardInfo: []
    }

    render() {

        const { cardInfo } = this.props

        return (
            <Link 
                to={`/note/${cardInfo.name}`}
                className='note-card'>
                    <h3>{cardInfo.name}</h3>
                    {cardInfo.modified}
            </Link>
        )

    }

}

export default NoteCard;