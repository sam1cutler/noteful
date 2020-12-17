import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import './AddNote.css';

class AddNote extends Component {

    static contextType = NotesContext;

    state = {
        error: null,
    };

    makeNewNoteId = () => {
        const characterPool = 'abcdefghijklmnopqrstuvwxyz0123456789';

        let randomAddition = '';
        for (let i=0 ; i<4 ; i++) {
            const randomCharacterPosition = Math.floor(Math.random() * Math.floor(36))
            randomAddition += characterPool[randomCharacterPosition];
        }

        return `e26e${randomAddition}-ffaf-11e8-8eb2-f2801f1b9fd1`;
    }

    handleAddNoteFormSubmission = event => {
        event.preventDefault();
        console.log('User submitted AddNote Form.')

        const { newNoteName, newNoteContent, targetFolder } = event.target;
        const timeStamp = (new Date()).toISOString();

        const newNote = {
            id: this.makeNewNoteId(),
            name: newNoteName.value,
            modified: timeStamp,
            folderId: targetFolder.value,
            content: newNoteContent.value,
        }

        fetch('http://localhost:9090/notes', {
            method: 'POST',
            body: JSON.stringify(newNote),
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(response => {
                if (!response.ok) {
                    console.log('Error!')
                    return response.json()
                    .then(error => {
                        throw error
                    })
                }
                return response.json()
            })
            .then(data => {
                console.log(data)
                this.context.addNote(data)
                this.props.history.push('/')
            })
            .catch(errorMessage => {
                this.setState({
                    error: errorMessage
                })
            })
    }

    render() {

        const folderOptions = this.context.folders.map(folder => 
            <option key={folder.id} value={folder.id}>{folder.name}</option>)

        return (

            <div className='add-note-form-container'>
                <h2>Add a new note:</h2>

                <form 
                    className='add-note-form'
                    onSubmit={this.handleAddNoteFormSubmission}>
                    <div>
                        { (this.state.error) && (`Error: ${this.state.error}`) }
                    </div>
                    <div>
                        <br /><br />
                        <label htmlFor='newNoteName'>
                            New note name:
                        </label>
                        <br />
                        <input 
                            type='text'
                            name='newNoteName'
                            id='newNoteName'
                            placeholder='puppo'
                            required
                        />
                        <br /><br />
                        <label htmlFor='newNoteContent'>
                            New note content:
                        </label>
                        <br />
                        <textarea 
                            type='text'
                            name='newNoteContent'
                            id='newNoteContent'
                            placeholder='Thoughts and/or grocery list items and/or Latin miscellany'
                            required
                        />
                        <br /><br />
                        <label htmlFor='targetFolder'>
                            Folder:
                        </label>
                        <br />
                        <select name='targetFolder'>
                            {folderOptions}
                        </select>
                        <br /><br />
                        <button type='submit'>
                            Add Note
                        </button>
                    </div>
                </form>
            </div>

        )

    }
}

export default AddNote;