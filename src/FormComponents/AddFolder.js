import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import './AddFolder.css';

class AddFolder extends Component {

    static contextType = NotesContext;

    state = {
        error: null,
    };

    makeNewFolderId = () => {
        const characterPool = 'abcdefghijklmnopqrstuvwxyz0123456789';

        let randomAddition = '';
        for (let i=0 ; i<4 ; i++) {
            const randomCharacterPosition = Math.floor(Math.random() * Math.floor(36))
            randomAddition += characterPool[randomCharacterPosition];
        }

        return `c071${randomAddition}-ffaf-11e8-8eb2-f2801f1b9fd1`;
    }

    handleAddFolderFormSubmission = event => {
        event.preventDefault();
        console.log('User submitted AddFolder Form, with the new folder name:')
        
        const newFolderName = event.target.newFolderName.value
        console.log(newFolderName)

        const newFolderId = this.makeNewFolderId()
        console.log(newFolderId)

        const newFolder = {
            id: newFolderId,
            name: newFolderName
        }

        fetch('http://localhost:9090/folders', {
            method: 'POST',
            body: JSON.stringify(newFolder),
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
                this.context.addFolder(data)
                this.props.history.push('/')
            })
            .catch(errorMessage => {
                this.setState({
                    error: errorMessage
                })
            })


    }

    render() {

        return (

            <div className='add-folder-form-container'>
                <h2>Add a new folder:</h2>

                <form 
                    className='add-folder-form'
                    onSubmit={this.handleAddFolderFormSubmission}>
                    <div>
                        { (this.state.error) && (`Error: ${this.state.error}`) }
                    </div>
                    <div>
                        <br /><br />
                        <label htmlFor='newFolderName'>
                            New folder name:
                        </label>
                        <br /><br />
                        <input 
                            type='text'
                            name='newFolderName'
                            id='newFolderName'
                            placeholder='odds and ends'
                            required
                        />
                        <br /><br />
                        <button type='submit'>
                            Add Folder
                        </button>
                    </div>
                </form>
            </div>

        )

    }

}

export default AddFolder;