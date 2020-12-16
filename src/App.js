import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import STORE from './dummy-store';
import ListOfNotes from './MainSection/ListOfNotes';
import ListOfFolders from './SidebarSection/ListOfFolders';
import NotePage from './MainSection/NotePage';
import NoteSidebar from './SidebarSection/NoteSidebar';
import NotesContext from './NotesContext';

//console.log(NotesContext);

class App extends Component {

  //state = STORE;

  state = {
    folders: [],
    notes: [],
  }

  componentDidMount() {
    
    console.log('Component Did Mount!')
    
    this.setState(STORE)
    
  }
  
  renderSidebarRoutes() {

    return (
      <>
        {['/','/folder/:folderId'].map(path => (
          <Route 
            key={path}
            path={path}
            exact
            component={ListOfFolders}
          />
        ))}
        <Route 
          path='/note/:noteName'
          component={NoteSidebar}
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
            component={ListOfNotes}
          />
        ))}
        <Route 
          path='/note/:noteName'
          component={NotePage}
        />
      </>
    )
  }
  
  render() {

    console.log('in the render, and the state looks like')
    console.log(this.state)

    return (
      <NotesContext.Provider value={this.state}>
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
      </NotesContext.Provider>
    )

  }

}

export default App;