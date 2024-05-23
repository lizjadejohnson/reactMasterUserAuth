import { useState, useContext } from 'react';
import { UserContext } from '../../utilities/UserContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const Navbar = () => {
    
    const navigate = useNavigate();


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
            navigate('/');
        } catch (error) {
            console.log("Logout failed.")
        }
      };

    return (
        <nav className="navbar">
            <span className='navbar-title'>Notes App</span>
            <ul>
                <li><a href="/">Home</a></li>
                {user ? (
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle">Account</a>
                        <ul className="dropdown-menu">
                            <li><Link to="/edit-profile">{user.username}: Edit Profile</Link></li>
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
                    <a href="#" className="dropdown-toggle">Content</a>
                    <ul className="dropdown-menu">
                        <li><Link to="/notes">Notes</Link></li>
                        <li><a href="#">Content Link 2</a></li>
                        <li><a href="#">Content Link 3</a></li>
                    </ul>
                </li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
  );
}

export default Navbar