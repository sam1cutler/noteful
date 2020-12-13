import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import './NoteSidebar.css';

class NoteSidebar extends Component {

    static defaultProps = {
        folderList: [ {
            name: '',
        } ],
        noteInfo: []
    }

    render() {

        const folderName = this.props.folderList.find(folder => 
            folder.id === this.props.noteInfo.folderId).name

        return (
            <div>
                <button type='button' onClick={this.props.onClickGoBack}>
                    <div className='back-button'>
                        Go Back
                    </div>
                </button><br />
                <h3>Current folder: {folderName}</h3>
                
            </div>
        )

    }

}

export default NoteSidebar;