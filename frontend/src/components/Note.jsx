import React from 'react'

const Note = ({notes, note, setUpdateForm, setNotes}) => {
  async function handleClick(_id) {
    try {
      await fetch(`http://localhost:3000/notes/${_id}`, {
        method: "DELETE"
      })
      const newNotes = notes.filter(note => note._id !== _id)
      setNotes([...newNotes])
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="a-note">
      <h1>{note.title}</h1>
      <p>{note.body}</p>
      <button onClick={() => setUpdateForm({...note})}>Edit</button>
      <button onClick={() => handleClick(note._id)}>Delete</button>
    </div>
  );
}

export default Note
