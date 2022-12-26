import { useEffect, useState } from 'react';
import axios from 'axios';
import SingleOwner from './SingleOwner';
import Button from 'react-bootstrap/Button';
import Cookies from 'universal-cookie';
import Spinner from 'react-bootstrap/Spinner';

import { Link } from 'react-router-dom';

const Owners = () => {
  const [loading, setLoading] = useState(false);

  const [owners, setOwners] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    axios
      .get('https://damiansoch-001-site1.etempurl.com/api/Owners', {
        headers: {
          Authorization: `Bearer ${cookies.get('jwt_authorisation')}`,
        },
      })
      .then((res) => {
        setOwners(res.data);
      })
      .finally(() => {
        setLoading(true);
      });
  }, []);

  return (
    <>
      <h1 className="my-2 text-center">Owners</h1>
      <Link to="/AddOwners">
        <Button variant="primary" className="mb-3 me-2 float-end">
          Add Owner
        </Button>
      </Link>

      {loading ? (
        <SingleOwner owners={owners} />
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
    </>
  );
};

export default Owners;
