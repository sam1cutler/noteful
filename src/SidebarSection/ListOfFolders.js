import React, { Component } from 'react';
//import { Route } from 'react-router-dom';
import './ListOfFolders.css';

class ListOfFolders extends Component {

    static defaultProps = {
        folderList: []
    }

    render() {

        const { folderList } = this.props

        //console.log(folderList);

        const folderLinksList = folderList.map( (folder, i) => {
            //console.log(folder);
            return (
                <div 
                    key={i}
                    className='folder-link-button'>
                        {folder.name}
                </div>
            )
        })

        return (
            <div>
                <h2>List of folders!</h2>
                {folderLinksList}
            </div>
        )

    }

}

export default ListOfFolders;