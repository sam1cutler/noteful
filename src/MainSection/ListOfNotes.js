import React, { Component } from 'react';
//import { Route } from 'react-router-dom';
import './ListOfNotes.css';
import NoteCard from './NoteCard';

class ListOfNotes extends Component {

    static defaultProps = {
        relevantNotes: []
    }

    render() {

        const cardList = this.props.relevantNotes.map( (activeNote, i) => {
            //console.log(activeNote);
            return (
                <NoteCard
                    key={i}
                    cardInfo={activeNote}
                />
            )
        })

        return (
            <div>
                <h2>Hey it's a list of NoteCards!</h2>
                {cardList}
            </div>
        )

    }

}

export default ListOfNotes;