import { useState } from 'react';
import { UserContext } from './UserContext';

const LoginPage = () => {

    //STATES FOR LOGGING IN:
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    //Pulls in the login context from our UserContext:
    const { login } = useContext(UserContext);

    //LOGIN LOGIC FOR OUR LOGIN FORM:
    const handleLogin = async (event) => {
        //Prevents form default reload and calls the login funciton from user context:
        event.preventDefault();
        await login(email, password);
      };

  return (
    <div>
        <h2>Login</h2>
        {/* call the handleLogin function on submit */}
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
        </form>
        {message && <p>{message}</p>}
    </div>
    );
};

export default LoginPage
