import React from "react";
import apiUrl from "../config";

export default function NoteUpdateForm({ updateForm, setUpdateForm, setNotes, setShowEdit }) {

    function handleChange(event) {
      setUpdateForm({
        ...updateForm,
        [event.target.name]: event.target.value
      })
    }
  
    async function handleSubmit(event) {
      event.preventDefault()
      try {
        const response = await fetch(`${apiUrl}/notes/${updateForm._id}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include', // Include credentials (cookies)
          body: JSON.stringify(updateForm)
        });

        const data = await response.json();
        setNotes(prevNotes =>
          prevNotes.map(note => note._id === data.note._id ? data.note : note)
        );
  
        setUpdateForm({
          _id: null,
          title: '',
          body: ''
      });
  
        setShowEdit(false); // Hide the form after updating!!
        
      } catch (error) {
        console.error(error)
      }
    }
  
    function handleClose(event) {
      event.preventDefault()
      setShowEdit(false); // Hide the form because 'close' clicked
    }
  
    return (
      <div className='formAdmin'>
        <h1>Edit Note</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='title'
            placeholder='Note Title'
            value={updateForm.title}
            onChange={handleChange}
          /><br />
          <textarea
            name='body'
            cols='20' rows='5'
            placeholder='Note Body'
            value={updateForm.body}
            onChange={handleChange}
          /><br />
          <div className="button-container">
            <button type='submit'>Update</button>
            <button onClick={handleClose}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }