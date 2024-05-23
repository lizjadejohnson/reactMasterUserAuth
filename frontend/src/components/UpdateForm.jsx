import React from "react";

export default function UpdateForm({ updateForm, setUpdateForm, setNotes, setShowEdit }) {

    function handleChange(event) {
      setUpdateForm({
        ...updateForm,
        [event.target.name]: event.target.value
      })
    }
  
    async function handleSubmit(event) {
      event.preventDefault()
      try {
        const response = await fetch(`http://localhost:3000/notes/${updateForm._id}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updateForm)
        });
        const updatedNote = await response.json();
        setNotes(prevNotes =>
          prevNotes.map(note => note._id === updatedNote._id ? updatedNote : note)
        );
  
        setUpdateForm(prevState => ({
          ...prevState,
          id: null,
          title: '',
          body: ''
        }));
  
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
          <button type='submit'>Update</button>
          <button onClick={handleClose}>Cancel</button>
        </form>
      </div>
    );
  }