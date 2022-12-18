import axios from 'axios';
import Cookies from 'universal-cookie';

import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import AllUsersBody from './AllUsersBody';

const AllUsers = () => {
  const cookies = new Cookies();
  const [users, setUsers] = useState(null);
  console.log(users);

  useEffect(() => {
    axios
      .get('http://damiansoch-001-site1.etempurl.com/api/Users', {
        headers: {
          Authorization: `Bearer ${cookies.get('jwt_authorisation')}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <AllUsersBody users={users} />
    </div>
  );
};

export default AllUsers;
