import React, { Component } from 'react';
//import { Route } from 'react-router-dom';
import './NoteCard.css';

class NoteCard extends Component {

    static defaultProps = {
        cardInfo: []
    }

    render() {

        const { cardInfo } = this.props

        return (
            <div className='note-card'>
                <h3>{cardInfo.name}</h3>
                <p>Date modified on: {cardInfo.modified}</p>
            </div>
        )

    }

}

export default NoteCard;