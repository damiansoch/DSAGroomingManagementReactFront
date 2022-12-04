import axios from 'axios';
import { useEffect, useState } from 'react';
import SinglePet from './SinglePet';
import Cookies from 'universal-cookie';

const Pets = () => {
  const [pets, setPets] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    axios
      .get('https://localhost:7162/api/Pets', {
        headers: {
          Authorization: `Bearer ${cookies.get('jwt_authorisation')}`,
        },
      })
      .then((res) => {
        setPets(res.data);
      });
  }, []);
  return (
    <>
      <h3 className="my-5">Pets</h3>
      <SinglePet pets={pets} />
    </>
  );
};

export default Pets;
