import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import './AddFolder.css';

class AddFolder extends Component {

    static contextType = NotesContext;

    state = {
        newFolderName: '',
        error: null,
    };

    /*-- Update state as form is filled out --*/
    updateName(inputName) {
        this.setState({ newFolderName: inputName })
    }

    handleAddFolderFormSubmission = event => {
        event.preventDefault();

        const newFolderName = {
            name: this.state.newFolderName
        }

        fetch('http://localhost:8000/api/folders', {
            method: 'POST',
            body: JSON.stringify(newFolderName),
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
                            onChange={e => this.updateName(e.target.value)}
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