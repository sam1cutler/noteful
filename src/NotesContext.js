import React from 'react';

const NotesContext = React.createContext({
    "folders": [],
    "notes": [],
    deleteNote: () => {},
    addFolder: () => {},
})

export default NotesContext;