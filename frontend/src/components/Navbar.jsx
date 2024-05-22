import { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';


const Navbar = () => {
    
    //STATES FOR LOGGING IN:
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Pulls in the contexts from our UserContext:
    const { login, logout, user } = useContext(UserContext);

    //LOGIN LOGIC FOR OUR LOGIN FORM:
    const handleLogin = async (event) => {
        //Prevents form default reload and calls the login funciton from user context:
        event.preventDefault();
        try{
            await login(email, password);
            console.log("Logged in")
        } catch(error){
            console.log("Login failed. Please try again.")
        }
      };

    //LOGOUT:
    const handleLogout = async (event) => {
        //Prevents form default reload and calls the logout funciton from user context:
        event.preventDefault();
        try{
            await logout();
            console.log("Logged out")
        } catch (error) {
            console.log("Logout failed.")
        }
      };

    return (
        <nav className="navbar">
            <span className='navbar-title'>Magickal Diary</span>
            <ul>
                <li><a href="/">Home</a></li>
                {user ? (
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle">Account</a>
                        <ul className="dropdown-menu">
                            <li><a href="/edit-profile">User: {user.username}<br />Edit Profile</a></li>
                            <li><a href="/logout" onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </li>
                ) : (
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle">User</a>
                        <ul className="dropdown-menu" id='login-dropdown'>
                            <div className="auth-forms">
                                <div className="login-container">
                                    <h2 className='login-head'>Login</h2>
                                    <form onSubmit={handleLogin}>
                                        <div>
                                            <label>Email:</label>
                                            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                                        </div>
                                        <div>
                                            <label>Password:</label>
                                            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                                        </div>
                                        <button type="submit">Login</button>
                                        <Link id="create-button" to="/signup">Create New Account</Link>
                                    </form>
                                </div>
                            </div>
                        </ul>
                    </li>
                )}
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle">Horoscopes</a>
                    <ul className="dropdown-menu">
                        <li><a href="/horoscope">Western Zodiac</a></li>
                        <li><a href="/eastern-zodiac">Eastern Zodiac</a></li>
                    </ul>
                </li>
                <li><a href="/about">About</a></li>
            </ul>
        </nav>
  );
}

export default Navbar