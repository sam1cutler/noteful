import React, { Component } from 'react';
//import { Route } from 'react-router-dom';
import './ListOfNotes.css';
import NoteCard from './NoteCard';

class ListOfNotes extends Component {

    static defaultProps = {
        relevantNotes: []
    }

    render() {

        //console.log('Notes that made it to ListOfNotes.js:')
        //console.log(this.props)

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
                {cardList}
            </div>
        )

    }

}

export default ListOfNotes;