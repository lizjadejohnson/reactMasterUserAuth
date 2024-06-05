import { useState, useEffect, useContext } from 'react';
import { getNotes } from '../../utilities/getNotes';
import Note from '../components/Note';
import NoteCreateForm from '../components/NoteCreateForm';
import { UserContext } from '../../utilities/UserContext';
import { Link } from 'react-router-dom';


//The note._id is provided by Mongo
export default function NotesPage() {
  const { user } = useContext(UserContext);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (user) { // Only fetch notes if there is a logged-in user
      getNotes(setNotes);
    }
  }, [user]);  // Depend on user to refetch when user state changes

  if (!user) {
    return <p>No notes found. <Link to="/signup">Create an account </Link>to start making notes!</p>;
  }

  return (
    <div>
      <NoteCreateForm setNotes={setNotes} />
      {notes.length > 0 ? (
        notes.map(note => (
          <Note 
            key={note._id}
            notes={notes} 
            note={note} 
            setNotes={setNotes}
          />
        ))
      ) : (
        <p>No notes to display. Try creating some!.</p>
      )}
    </div>
  );
}