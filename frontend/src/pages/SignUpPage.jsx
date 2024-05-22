import { useState, useContext } from 'react';
import { UserContext } from '../components/UserContext';
import { useNavigate } from 'react-router-dom'; 

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signup } = useContext(UserContext);

  //Needed to redirect with react-router-dom
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      await signup(username, email, password);
      console.log('Signup successful! You can now log in.');
      //Redirects to notes after successful login
      navigate('/notes');
    } catch (error) {
      console.log('Signup failed. Please try again.');
    }
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
    </div>
  );
};

export default SignUpPage;
