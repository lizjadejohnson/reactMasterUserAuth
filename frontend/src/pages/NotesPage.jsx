import { useState, useEffect } from 'react';
import { getNotes } from '../../utilities/getNotes';
import Note from '../components/Note';
import CreateForm from '../components/CreateForm';


//The note._id is provided by Mongo
export default function NotesPage() {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes(setNotes)
  }, [notes])
  

  return (
    <div>
      <CreateForm setNotes={setNotes} />
      {notes.map(note => {
        return (
          <Note 
            key={note._id}
            notes={notes} 
            note={note} 
            setNotes={setNotes}
          />
        )
      })}
    </div>
  );
}