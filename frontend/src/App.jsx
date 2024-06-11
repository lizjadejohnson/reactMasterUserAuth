import { useState, useEffect } from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Navbar from './components/Navbar';
import NotesPage from './pages/NotesPage'
import SignUpPage from './pages/SignUpPage';
import AboutPage from './pages/AboutPage';
import EditProfilePage from './pages/EditProfilePage';
import HeroImage from './components/HeroImage';


function App() {

  //------------------------------------------[State]-----------------------------------------------------



  //------------------------------------------[CRUD Operations]-------------------------------------------



  return (
    <>
      <div className='App'>
          <Navbar />
          <div className='MainContent'>
            <Routes>
            <Route path="/" element={<HeroImage />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/edit-profile" element={<EditProfilePage />} />
            </Routes>
          </div>
      </div>
    </>
  );
}

export default App;