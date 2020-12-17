import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import ListOfNotes from './MainSection/ListOfNotes';
import ListOfFolders from './SidebarSection/ListOfFolders';
import NotePage from './MainSection/NotePage';
import NoteSidebar from './SidebarSection/NoteSidebar';
import NotesContext from './NotesContext';
import AddFolder from './FormComponents/AddFolder';
import AddNote from './FormComponents/AddNote';


class App extends Component {

  state = {
    folders: [],
    notes: [],
  }

  componentDidMount() {
    
    console.log('Component Did Mount!')
    
    fetch('http://localhost:9090/folders')
      .then(response => {
        console.log('starting folders fetch')
        if (!response.ok) {
          console.log('Something wrong with folders fetch request.');
          throw new Error('Something wrong with folders fetch request.');
        }
        return response.json();
      })
      .then(responseJson => {
        //console.log('Folders fetch worked! Yielded:')
        //console.log(responseJson)
        this.setState({
          folders: responseJson
        })
      })
      .catch(error => {
        console.log(error)
      });
    
      fetch('http://localhost:9090/notes')
        .then(response => {
          console.log('starting notes fetch')
          if (!response.ok) {
            //console.log('Something wrong with notes fetch request.');
            throw new Error('Something wrong with notes fetch request.');
          }
          return response.json();
        })
        .then(responseJson => {
          //console.log('Notes fetch worked! Yielded:')
          //console.log(responseJson)
          this.setState({
            notes: responseJson
          })
        })
        .catch(error => {
          console.log(error)
        })
    
  }

  handleDeleteNote = (noteId) => {
    console.log('In App.js, hoping to remove deleted note from the DOM')
    const newNotesList = this.state.notes.filter( note => 
      note.id !== noteId)
    this.setState({
      notes: newNotesList
    })
  }

  handleAddFolder = (newFolder) => {
    console.log('In App.js, hoping to add a new folder to state.')
    this.setState({
      folders: [ ...this.state.folders, newFolder]
    })
  }
  
  renderSidebarRoutes() {

    return (
      <>
        {['/','/folder/:folderId','/AddFolder','/AddNote']
          .map(path => (
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
        <Route 
          path='/AddFolder'
          component={AddFolder}
        />
        <Route 
          path='/AddNote'
          component={AddNote}
        />
      </>
    )
  }
  
  render() {

    //console.log('in the render, and the state looks like')
    //console.log(this.state)

    const value = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
    }

    return (
      <NotesContext.Provider value={value}>
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