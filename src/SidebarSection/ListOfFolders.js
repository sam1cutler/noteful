import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NotesContext from '../NotesContext';
import './ListOfFolders.css';

class ListOfFolders extends Component {

    static contextType = NotesContext

    render() {
        
        const { folders } = this.context
        
        const folderLinksList = folders.map( (folder, i) => {
            return (
                <li key={i}>
                    <NavLink 
                        to={ `/folder/${folder.id}` }
                        className='folder-nav-link'>
                            {folder.name}
                    </NavLink>
                </li>
            )
        })

        return (
            <div>
                <ul>
                    {folderLinksList}
                </ul>
                <NavLink
                    to={'/AddFolder'}
                    className='add-folder-button'>
                        Add Folder
                </NavLink>
            </div>
        )
    }
}

export default ListOfFolders;