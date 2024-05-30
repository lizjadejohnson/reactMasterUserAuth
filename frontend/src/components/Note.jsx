import { useState } from 'react';
import UpdateForm from './UpdateForm';

const Note = ({notes, note, setNotes}) => {

  const [showEdit, setShowEdit] = useState(false);
  const [updateForm, setUpdateForm] = useState({ _id: null, title: '', body: '' });


  async function handleClick(_id) {
    try {
      await fetch(`http://localhost:3000/notes/${_id}`, {
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
          <button onClick={handleEditClick}>Edit</button>
        </>
      )}
      {showEdit && (
        <UpdateForm
          updateForm={updateForm}
          setUpdateForm={setUpdateForm}
          setNotes={setNotes}
          setShowEdit={setShowEdit}
        />
      )}
      <button onClick={() => handleClick(note._id)} className='delete-button'>Delete</button>
    </div>
  );
}

export default Note
