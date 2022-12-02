import { useEffect, useState } from 'react';
import axios from 'axios';
import SingleOwner from './SingleOwner';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Owners = () => {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7162/api/Owners').then((res) => {
      setOwners(res.data);
    });
  }, []);

  return (
    <>
      <Link to="/AddOwners">
        <Button variant="primary" className="mb-3 me-2 float-end">
          Add Owner
        </Button>
      </Link>
      <h3 className="my-5">Owners</h3>
      <SingleOwner owners={owners} />
    </>
  );
};

export default Owners;
