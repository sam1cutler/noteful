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
            <Route 
              path='/'
              exact
              render={ () => 
                <ListOfFolders 
                  folderList={this.state.folders}
                />
              }
            />
            <Route 
              path='/folder'
              render={ () => 
                <ListOfFolders 
                  folderList={this.state.folders}
                />
              }
            />
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

        
          </section>
          <section className='major-section main-section'>
            <Route
              path='/'
              exact
              render={ () => 
                <ListOfNotes 
                  relevantNotes={this.state.notes}
                />    
              }
            />
            <Route
              path='/folder/:folderId'
              render={ (props) => {
                //console.log('alt route')
                //console.log(props)
                //console.log(props.match.params)
                return (
                  <ListOfNotes 
                    relevantNotes={this.state.notes.filter(note =>
                      note.folderId === props.match.params.folderId)}
                  />
                )    
              }}
            />
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
          
          </section>
        </main>
      </div>
    )

  }

}

export default App;