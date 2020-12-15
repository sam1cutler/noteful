import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import STORE from './dummy-store';
import ListOfNotes from './MainSection/ListOfNotes';
import ListOfFolders from './SidebarSection/ListOfFolders';
import NotePage from './MainSection/NotePage';
import NoteSidebar from './SidebarSection/NoteSidebar';

class App extends Component {

  state = STORE;

  filterListOfNotes(currentFolderId) {
    if (currentFolderId) {
      return (
        this.state.notes.filter(note =>
        note.folderId === currentFolderId)
      )
    } else {
      return this.state.notes;
    }
  }
  
  renderSidebarRoutes() {

    return (
      <>
        {['/','/folder/:folderId'].map(path => (
          <Route 
            key={path}
            path={path}
            exact
            render={ () => 
              <ListOfFolders 
                folderList={this.state.folders}
              />
            }
          />
        ))}
        <Route 
          path='/note/:noteName'
          render={ (props) => 
            <NoteSidebar 
              noteInfo={this.state.notes.find(note => 
                note.name === props.match.params.noteName)}
              folderList={this.state.folders}
              onClickGoBack={ () => props.history.goBack()}
            />
          }
        />
      </>
    )
  }

  renderMainRoutes() {

    return (

      <>
        {['/','/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={ (props) => {
              const relevantNotesList = 
              this.filterListOfNotes(props.match.params.folderId);
              return (
                <ListOfNotes 
                  relevantNotes={relevantNotesList}
                />
              )    
            }}
          />
        ))}
        <Route 
          path='/note/:noteName'
          render={ (props) => {
            return (
              <NotePage 
                noteInfo={this.state.notes.find(note => 
                  note.name === props.match.params.noteName)}
              />
            )
          }}
        />
      </>
    )
  }
  
  render() {

    return (
      <div>
        <header className='App-header'>
          <Link to='/'>
            <h1>Noteful!</h1>
          </Link>
        </header>
        <main className='major-group'>
          <section className='major-section folders-section'>
            {this.renderSidebarRoutes()}        
          </section>
          <section className='major-section main-section'>
            {this.renderMainRoutes()}          
          </section>
        </main>
      </div>
    )

  }

}

export default App;