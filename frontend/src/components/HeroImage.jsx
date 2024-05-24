import React from 'react'
import { Link } from 'react-router-dom';

const HeroImage = () => {
  return (
    <div className="hero-image">
        <div className="hero-text">
            <h1>Notes App</h1>
            <p>Welcome to the Notes App</p>
            <button><Link to="/notes">Go to Notes</Link></button>
        </div>
    </div>
  )
}

export default HeroImage
