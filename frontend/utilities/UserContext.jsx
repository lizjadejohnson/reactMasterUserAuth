import {useState, useEffect, createContext} from 'react'
import axios from 'axios';
import apiUrl from '../src/config';

//Creating a user context:
const UserContext = createContext();

const UserProvider = ({ children }) => {

    //User state

    const [user, setUser] = useState(null);

  /////////////////////////////////////////////////////////////////////////////////////////////////

    // Function to fetch user data based on the token
    const fetchUser = async () => {
      try {
          const response = await axios.get(`${apiUrl}/users/me`, { withCredentials: true });
          //This sets the user state to the user:
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
        const response = await axios.post(`${apiUrl}/users/login`, { email, password }, { withCredentials: true });
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
        await axios.get(`${apiUrl}/users/logout`, { withCredentials: true });
        
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
    const signup = async ( username, email, password, dob ) => {
      try {
        const response = await axios.post(`${apiUrl}/users`, {username, email, password, dob}, { withCredentials: true });
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
          const response = await axios.put(`${apiUrl}/users/me`, userData, { withCredentials: true });
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
      /////////////////////////////////////////////////////////////////////////////////////////////////

    //Function to delete user:
  
    const deleteUser = async () => {
      try {
        //This will DELETE the user!!!
        await axios.delete(`${apiUrl}/users/me`, { withCredentials: true });
        
        //This sets the user state back to null
        setUser(null);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          throw new Error(error.response.data.message);
        } else {
          throw new Error('Deletion failed');
        }
      }

    };

    /////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        //Allows us to wrap components with the user state
        //Provides access to the loigin & logout functions as well as the user state:
      <UserContext.Provider value={{ user, login, logout, signup, updateUser, deleteUser }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  //Exporting needs to be broken up into UserContext & UserProvider.
  //We'll need to wrap our whole app with UserProvider so that all pages/components can use it
  //We'll need to wrap our individual components in UserContext:
  export { UserContext, UserProvider };
