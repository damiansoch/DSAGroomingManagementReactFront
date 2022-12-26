import axios from 'axios';
import Cookies from 'universal-cookie';

import { useEffect, useState } from 'react';

import SinglePet from './SinglePet';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import AddPet from './AddPet';

const Pets = () => {
  const [loading, setLoading] = useState(false);

  const [modalShow, setModalShow] = useState(false);

  const [pets, setPets] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    axios
      .get('https://damiansoch-001-site1.etempurl.com/api/Pets', {
        headers: {
          Authorization: `Bearer ${cookies.get('jwt_authorisation')}`,
        },
      })
      .then((res) => {
        setPets(res.data);
      })
      .finally(() => {
        setLoading(true);
      });
  }, []);
  return (
    <div className="text-end">
      <h1 className="my-2 text-center">Pets</h1>
      <Button
        className="my-2"
        variant="primary"
        onClick={() => setModalShow(true)}
      >
        Add pet
      </Button>
      {loading ? (
        <SinglePet pets={pets} />
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
      <AddPet show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default Pets;
