import { useState, useContext } from 'react';
import { UserContext } from '../../utilities/UserContext';
import { useNavigate } from 'react-router-dom'; 
import Spinner from '../components/Spinner';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const { user, signup } = useContext(UserContext);

  //Needed to redirect with react-router-dom
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      await signup(username, email, password);
      setMessage('Signup successful! You can now log in.');
      //Redirects to home after successful login
      navigate('/');
    } catch (error) {
        const message = error.message || 'Signup failed. Please try again.';
        setMessage(message);
        setTimeout(() => setMessage(''), 3000);
      }
    };

    //If someone is already logged in:
    if (user) {
      return (
        <Spinner redirectTo={'/'} delay={3000} message={"User already logged in. Redirecting to homepage..."}/>
      );
    };

  return (
    <div className='signup-container'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {message && <p style={{ color: 'red' }}>{message}</p>}
    </div>
  );
};

export default SignUpPage;
