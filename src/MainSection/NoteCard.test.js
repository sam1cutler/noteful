import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import NoteCard from './NoteCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <NoteCard 
        modified='2019-01-03T00:00:00.000Z'
      />
    </BrowserRouter>, 
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
