import { useState } from 'react';
import NoteUpdateForm from './NoteUpdateForm';
import apiUrl from '../config';

const Note = ({notes, note, setNotes}) => {

  const [showEdit, setShowEdit] = useState(false);
  const [updateForm, setUpdateForm] = useState({ _id: null, title: '', body: '' });


  async function handleClick(_id) {
    try {
      await fetch(`${apiUrl}/notes/${_id}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include credentials (cookies)
      })

      const newNotes = notes.filter(note => note._id !== _id)
      setNotes([...newNotes])
    } catch (error) {
      console.error(error)
    }
  }

  const handleEditClick = () => {
    setUpdateForm({ ...note });
    setShowEdit(true);
  };

  return (
    
    
    <div className="a-note">
      {!showEdit && (
        <>
          <h1>{note.title}</h1>
          <p>{note.body}</p>
          <div className='button-container'>
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={() => handleClick(note._id)} className='delete-button'>Delete</button>
          </div>
        </>
      )}
      {showEdit && (
        <NoteUpdateForm
          updateForm={updateForm}
          setUpdateForm={setUpdateForm}
          setNotes={setNotes}
          setShowEdit={setShowEdit}
        />
      )}
      
    </div>
  );
}

export default Note
