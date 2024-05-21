export default function UpdateForm({ updateForm, setUpdateForm }) {
    function handleChange(event) {
      setUpdateForm({
        ...updateForm,
        [event.target.name]: event.target.value
      })
    }
  
    async function handleSubmit(event) {
      event.preventDefault()
      try {
        await fetch(`http://localhost:3000/notes/${updateForm._id}`, {
          method: "PUT",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateForm)
        })
        setUpdateForm({ _id: null, title: '', body: '' })
      } catch (error) {
        console.error(error)
      }
    }
  
    return (
      <div className='formAdmin'>
        <h1>Update Form</h1>
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
        </form>
      </div>
    );
  }