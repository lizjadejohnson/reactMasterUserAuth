import {useState, createContext} from 'react'
import axios from 'axios';

//Creating a user context:
const UserContext = createContext();

const UserProvider = ({ children }) => {

    //User state

    const [user, setUser] = useState(null);
  
    //Function to login

    const login = async (email, password) => {
      try {
        //This logs the user in
        const response = await axios.post('http://localhost:3000/users/login', { email, password }, { withCredentials: true });
        
        //This sets the user state to the user
        setUser(response.data.user);
      } catch (error) {
        console.error('Login failed:', error.response.data.message);
      }
    };

    //Function to logout
  
    const logout = async () => {
      try {
        //This logs the user out
        await axios.get('http://localhost:3000/users/logout', { withCredentials: true });
        
        //This sets the user state back to null
        setUser(null);
      } catch (error) {
        console.error('Logout failed:', error.response.data.message);
      }
    };
  
    return (
        //Allows us to wrap components with the user state
        //Provides access to the loigin & logout functions as well as the user state:
      <UserContext.Provider value={{ user, login, logout }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  //Exporting needs to be broken up into UserContext & UserProvider.
  //We'll need to wrap our whole app with UserProvider so that all pages/components can use it
  //We'll need to wrap our individual components in UserContext:
  export { UserContext, UserProvider };
