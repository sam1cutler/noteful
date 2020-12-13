import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './ListOfFolders.css';

class ListOfFolders extends Component {

    static defaultProps = {
        folderList: []
    }

    render() {

        const { folderList } = this.props


        const folderLinksList = folderList.map( (folder, i) => {
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
            </div>
        )

    }

}

export default ListOfFolders;