import { useState, useEffect } from 'react';
import './App.css';
import { getNotes } from './components/getNotes'
import NotesPage from './pages/NotesPage'
import CreateForm from './components/CreateForm'
import UpdateForm from './components/UpdateForm'


function App() {

  //------------------------------------------[State]-----------------------------------------------------

  const [notes, setNotes] = useState([]);
  const [updateForm, setUpdateForm] = useState({ _id: null, title: '', body: '' });
  

  

  //------------------------------------------[CRUD Operations]-------------------------------------------

  useEffect(() => {
    getNotes(setNotes)
  }, [notes])

  return (
    <div className='App'>
      <CreateForm setNotes={setNotes} />
      <UpdateForm updateForm={updateForm} setUpdateForm={setUpdateForm} />
      <NotesPage notes={notes} setNotes={setNotes} setUpdateForm={setUpdateForm} />
    </div>
  );
}

export default App;