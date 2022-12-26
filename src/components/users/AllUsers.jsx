import axios from 'axios';
import Cookies from 'universal-cookie';

import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import AllUsersBody from './AllUsersBody';

import Spinner from 'react-bootstrap/Spinner';

const AllUsers = () => {
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const [users, setUsers] = useState(null);
  // console.log(users);

  useEffect(() => {
    axios
      .get('https://localhost:7162/api/Users', {
        headers: {
          Authorization: `Bearer ${cookies.get('jwt_authorisation')}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(true);
      });
  }, []);
  return (
    <div>
      {loading ? (
        <AllUsersBody users={users} />
      ) : (
        <Spinner
          animation="border"
          variant="danger"
          style={{
            position: 'fixed',
            top: '49%',
            left: '49%',
          }}
        />
      )}
    </div>
  );
};

export default AllUsers;
