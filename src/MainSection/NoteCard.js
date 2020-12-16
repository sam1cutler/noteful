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

        const date = new Date(cardInfo.modified) || 'Fri Nov 30 2018 16:00:00 GMT-0800 (Pacific Standard Time)'

        console.log('New date is:')
        console.log(date)
    
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