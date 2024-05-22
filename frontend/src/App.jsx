import { useState, useEffect } from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";

import NotesPage from './pages/NotesPage'
import Navbar from './components/Navbar';
import SignUpPage from './pages/SignUpPage';


function App() {

  //------------------------------------------[State]-----------------------------------------------------



  //------------------------------------------[CRUD Operations]-------------------------------------------



  return (
    <>
      <div className='App'>
          <Navbar />
          <div className='MainContent'>
            <Routes>
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Routes>
          </div>
      </div>
    </>
  );
}

export default App;