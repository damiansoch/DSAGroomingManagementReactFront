import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const UserContext = createContext();
const cookies = new Cookies();

export function UserProvider({ children }) {
  const [user, setUser] = useState(cookies.get('jwt_authorisation'));
  const [userForDelete, setUserForDelete] = useState({});
  const navigate = useNavigate();
  console.log(user);

  //logout
  const logout = () => {
    setUser(null);
    cookies.remove('jwt_authorisation');
    cookies.remove('refreshToken');
    navigate('/');
  };

  return (
    <UserContext.Provider
      value={{ setUser, user, logout, userForDelete, setUserForDelete }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
