import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NotesContext from '../NotesContext';
import './ListOfFolders.css';

class ListOfFolders extends Component {

    static defaultProps = {
        folderList: []
    }

    static contextType = NotesContext

    render() {

        //console.log('In List of Folders.')

        //console.log(this.context)
        
        const { folders } = this.context

        //console.log(folders)
        
        const folderLinksList = folders.map( (folder, i) => {
            //console.log(folder);
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