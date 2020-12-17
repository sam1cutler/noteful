import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import './AddNote.css';
import ValidationError from '../ErrorsAndValidation/ValidationError';

class AddNote extends Component {

    static contextType = NotesContext;

    state = {
        newNoteName: '',
        newNoteContent: '',
        targetFolder: '',
        error: null,
    };

    // Generate a mostly-random new string to uniquely ID this new note
    makeNewNoteId = () => {
        const characterPool = 'abcdefghijklmnopqrstuvwxyz0123456789';

        let randomAddition = '';
        for (let i=0 ; i<4 ; i++) {
            const randomCharacterPosition = Math.floor(Math.random() * Math.floor(36))
            randomAddition += characterPool[randomCharacterPosition];
        }

        return `e26e${randomAddition}-ffaf-11e8-8eb2-f2801f1b9fd1`;
    }


    /*-- Update state as form is filled out --*/
    updateName(inputName) {
        this.setState({ newNoteName: inputName })
    }
    updateContent(inputContent) {
        this.setState({ newNoteContent: inputContent })
    }
    updateFolder(inputFolder) {
        this.setState({ targetFolder: inputFolder })
    }

    /*-- Validate form components --*/
    validateNewNoteName() {
        const name = this.state.newNoteName.trim();
        if (name.length === 0) {
          return 'Name is required';
        }
    }
    validateNewNoteContent() {
        const content = this.state.newNoteContent.trim();
        if (content.length === 0) {
          return 'Note content is required';
        }
    }
    validateNewNoteFolder() {
        const folder = this.state.targetFolder.trim();
        if (folder.length === 0) {
          return 'A folder choice is required';
        }
    }


    handleAddNoteFormSubmission = event => {
        event.preventDefault();
        console.log('User submitted AddNote Form.')

        const { newNoteName, newNoteContent, targetFolder } = this.state;
        const timeStamp = (new Date()).toISOString();

        const newNote = {
            id: this.makeNewNoteId(),
            name: newNoteName,
            modified: timeStamp,
            folderId: targetFolder,
            content: newNoteContent,
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

            <div>
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
                                onChange={e => this.updateName(e.target.value)}
                            />
                            <ValidationError message={this.validateNewNoteName()}/>
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
                                onChange={e => this.updateContent(e.target.value)}
                            />
                            <ValidationError message={this.validateNewNoteContent()}/>
                            <br /><br />
                            <label htmlFor='targetFolder'>
                                Folder:
                            </label>
                            <br />
                            <select 
                                name='targetFolder'
                                required
                                defaultValue='choose'
                                onChange={e => this.updateFolder(e.target.value)}>
                                <option value='choose' disabled>Choose one</option>
                                {folderOptions}
                            </select>
                            <ValidationError message={this.validateNewNoteFolder()}/>
                            <br /><br />
                            <button 
                                type='submit' 
                                className='submission-button'
                                disabled={
                                    this.validateNewNoteName() ||
                                    this.validateNewNoteContent() ||
                                    this.validateNewNoteFolder()
                                }>
                                Add Note
                            </button>
                        </div>
                    </form>
                </div>
                <br />
                <button className='back-button' onClick={() => this.props.history.goBack()}>
                    Go Back
                </button>
            </div>

        )

    }
}

export default AddNote;