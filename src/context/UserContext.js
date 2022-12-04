import axios from 'axios';
import { createContext, useState } from 'react';
import Cookies from 'universal-cookie';

const UserContext = createContext();
const cookies = new Cookies();

export function UserProvider({ children }) {
  const [user, setUser] = useState(cookies.get('jwt_authorisation'));

  //logout
  const logout = () => {
    setUser(null);
    cookies.remove('jwt_authorisation');
    cookies.remove('refreshToken');
  };

  return (
    <UserContext.Provider value={{ setUser, user, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
