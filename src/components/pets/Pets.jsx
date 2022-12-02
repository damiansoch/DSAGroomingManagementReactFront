import axios from 'axios';
import { useEffect, useState } from 'react';
import SinglePet from './SinglePet';

const Pets = () => {
  const [pets, setPets] = useState([]);
  useEffect(() => {
    axios.get('https://localhost:7162/api/Pets').then((res) => {
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
