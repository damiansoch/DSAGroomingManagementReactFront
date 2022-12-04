import Button from 'react-bootstrap/Button';

import UserContext from '../../context/UserContext';
import { useContext } from 'react';

const Logout = () => {
  const { logout } = useContext(UserContext);

  return (
    <div className="text-center mt-5">
      <Button variant="danger" onClick={logout}>
        LogOut
      </Button>
    </div>
  );
};

export default Logout;
