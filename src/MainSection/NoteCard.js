import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NoteCard.css';

class NoteCard extends Component {

    static defaultProps = {
        cardInfo: []
    }

    render() {

        const { cardInfo } = this.props

        //console.log(cardInfo);

        return (
            <Link 
                to={`/note/${cardInfo.name}`}
                className='note-card'>
                    <h3>{cardInfo.name}</h3>
                    <p>Date modified on: {cardInfo.modified}</p>
            </Link>
        )

    }

}

export default NoteCard;