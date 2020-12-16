import React, { Component } from 'react';
import './NoteSidebar.css';
import NotesContext from '../NotesContext';

class NoteSidebar extends Component {

    static defaultProps = {
        folderList: [ {
            name: '',
        } ],
        noteInfo: []
    }

    static contextType = NotesContext

    render() {

        //console.log('In NoteSidebar.js')
        //console.log(this.context)
        //console.log(this.context.notes)
        //console.log(this.props.match.params.noteName)


        const activeNote = this.context.notes.find(note => 
            note.name === this.props.match.params.noteName) || {}

        //console.log(activeNote)

        const activeFolderObject = this.context.folders.find(folder => 
            folder.id === activeNote.folderId) || {}

        const activeFolder = activeFolderObject.name

        //console.log(activeFolder)

       
        return (
            <div>
                <button className='back-button' onClick={() => this.props.history.goBack()}>
                    Go Back
                </button>
                <h3>Current folder: {activeFolder}</h3>
                
            </div>
        )
        

    }

}

export default NoteSidebar;