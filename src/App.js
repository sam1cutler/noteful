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
import ErrorBoundary from './ErrorsAndValidation/ErrorBoundary';


class App extends Component {

  state = {
    folders: [],
    notes: [],
  }

  componentDidMount() {
    
    fetch('http://localhost:8000/api/folders')
      .then(response => {
        if (!response.ok) {
          console.log('Something wrong with folders fetch request.');
          throw new Error('Something wrong with folders fetch request.');
        }
        return response.json();
      })
      .then(responseJson => {
        this.setState({
          folders: responseJson
        })
      })
      .catch(error => {
        console.log(error)
      });
    
      fetch('http://localhost:8000/api/notes')
        .then(response => {
          if (!response.ok) {
            throw new Error('Something wrong with notes fetch request.');
          }
          return response.json();
        })
        .then(responseJson => {
          this.setState({
            notes: responseJson
          })
        })
        .catch(error => {
          console.log(error)
        })   
  }

  /*-- functions to handle interactivity --*/
  handleDeleteNote = (noteId) => {
    const newNotesList = this.state.notes.filter( note => 
      note.id !== noteId)
    this.setState({
      notes: newNotesList
    })
  }
  handleAddFolder = (newFolder) => {
    this.setState({
      folders: [ ...this.state.folders, newFolder]
    })
  }
  handleAddNote = (newNote) => {
    this.setState({
      notes: [ ...this.state.notes, newNote]
    })
  }
  
  /*-- Render the two main clusters of Routes --*/
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

    const value = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
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
            <ErrorBoundary section='sidebar'>
              <section className='major-section folders-section'>
                {this.renderSidebarRoutes()}        
              </section>
            </ErrorBoundary>
            <ErrorBoundary section='main'>
              <section className='major-section main-section'>
                {this.renderMainRoutes()}          
              </section>
            </ErrorBoundary>
          </main>
        </div>
      </NotesContext.Provider>
    )
  }
}

export default App;