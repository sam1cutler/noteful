import React, { Component } from 'react';
//import { Route } from 'react-router-dom';
import './App.css';
import STORE from './dummy-store';
import ListOfNotes from './MainSection/ListOfNotes';
import ListOfFolders from './SidebarSection/ListOfFolders';

class App extends Component {

  state = STORE;

  render() {

    //console.log(this.state.notes)

    return (
      <div>
        <header className='App-header'>
          <h1>Noteful!</h1>
        </header>
        <main className='major-group'>
          <section className='major-section folders-section'>
            <ListOfFolders 
              folderList={this.state.folders}
            />
          </section>
          <section className='major-section main-section'>
            <ListOfNotes 
              relevantNotes={this.state.notes}
            />
          </section>
        </main>
      </div>
    )

  }

}

export default App;