import {useState, useEffect, createContext} from 'react'
import axios from 'axios';

//Creating a user context:
const UserContext = createContext();

const UserProvider = ({ children }) => {

    //User state

    const [user, setUser] = useState(null);

  /////////////////////////////////////////////////////////////////////////////////////////////////

    // Function to fetch user data based on the token
    const fetchUser = async () => {
      try {
          const response = await axios.get('http://localhost:3000/users/me', { withCredentials: true });
          setUser(response.data.user);
      } catch (error) {
          console.error('Failed to fetch user:', error);
          setUser(null);
      }
  };

    // Check for the token and fetch user data when the provider mounts
    useEffect(() => {
        fetchUser();
    }, []);
  
    /////////////////////////////////////////////////////////////////////////////////////////////////

    //Function to login
    const login = async (email, password) => {
      try {
        //This logs the user in
        const response = await axios.post('http://localhost:3000/users/login', { email, password }, { withCredentials: true });
        
        //This sets the user state to the user
        setUser(response.data.user);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        } else {
          throw new Error('Login failed');
        }
      }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////

    //Function to logout
  
    const logout = async () => {
      try {
        //This logs the user out
        await axios.get('http://localhost:3000/users/logout', { withCredentials: true });
        
        //This sets the user state back to null
        setUser(null);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        } else {
          throw new Error('Logout failed');
        }
      }

    };

    /////////////////////////////////////////////////////////////////////////////////////////////////

    //Function to sign up:
    const signup = async (username, email, password) => {
      try {
        const response = await axios.post('http://localhost:3000/users', { username, email, password }, { withCredentials: true });
        setUser(response.data.user);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        } else {
          throw new Error('Signup failed');
        }
      }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////

    //Function to edit profile
    const updateUser = async (userData) => {
      try {
          const response = await axios.put('http://localhost:3000/users/me', userData, { withCredentials: true });
          setUser(response.data.user);
          return response.data;
        } catch (error) {
          if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
          } else {
            throw new Error('Profile change failed');
          }
        }
      };
  
    return (
        //Allows us to wrap components with the user state
        //Provides access to the loigin & logout functions as well as the user state:
      <UserContext.Provider value={{ user, login, logout, signup, updateUser }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  //Exporting needs to be broken up into UserContext & UserProvider.
  //We'll need to wrap our whole app with UserProvider so that all pages/components can use it
  //We'll need to wrap our individual components in UserContext:
  export { UserContext, UserProvider };
