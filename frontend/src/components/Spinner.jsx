import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'


//Takes as props where it is redirecting to, how long to stay on the page, and a custom message ability:
//Uses home, 5 seconds and "Redirecting...." as defaults:
const Spinner = ({ redirectTo = "/", delay = 5000, message = 'Redirecting...' }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Set up a timer to navigate to the specified URL after the delay
        const timer = setTimeout(() => {
            navigate(redirectTo);
        }, delay);

        // Clean up the timer:
        return () => clearTimeout(timer);
    }, [navigate, redirectTo, delay]); // Dependencies included for useEffect


    return (
        <div className='redirect-container'>
            <div className='redirect-message'>{message}</div>
            <div className="spinner"></div>
        </div>
    );
};

export default Spinner;
