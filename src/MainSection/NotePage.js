import React, { Component } from 'react';
//import { Route } from 'react-router-dom';
import './NotePage.css';
import NoteCard from './NoteCard'

class NotePage extends Component {

    static defaultProps = {
        noteInfo: []
    }

    render() {

        const { noteInfo } = this.props

        return (
            <div>
                <NoteCard 
                    cardInfo={noteInfo}
                />
                <p>{noteInfo.content}</p>
            </div>
        )

    }

}

export default NotePage;