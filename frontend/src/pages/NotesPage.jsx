import React from 'react'
import Note from '../components/Note'


//The note._id is provided by Mongo
export default function NotesPage({ notes, setNotes, setUpdateForm }) {
  return (
    <div>
      {notes.map(note => {
        return (
          <Note 
            key={note._id}
            notes={notes} 
            note={note} 
            setUpdateForm={setUpdateForm} 
            setNotes={setNotes}
          />
        )
      })}
    </div>
  );
}