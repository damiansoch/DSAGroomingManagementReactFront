import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import CurrentPetContext from '../../context/CurrentPetContext';
import { useContext, useState } from 'react';
import EditPet from './EditPet';

const SinglePet = ({ pets }) => {
  const [modalShow, setModalShow] = useState(false);
  const { currentPet, setCurrentPet } = useContext(CurrentPetContext);
  const petArray = pets.map((pet, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{pet.name}</td>
        <td>{pet.type}</td>
        <td>{pet.breed}</td>
        <td>{pet.owner.name}</td>
        <td>{pet.owner.phoneNumber}</td>
        <td>
          <Button
            variant="warning"
            onClick={() => {
              setCurrentPet(pet);
              setModalShow(true);
            }}
            className="my-2 mx-2"
          >
            Edit
          </Button>
        </td>
      </tr>
    );
  });
  return (
    <>
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Breed</th>
            <th>Owner</th>
            <th>Owner's phone number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{petArray}</tbody>
      </Table>
      {currentPet && (
        <EditPet show={modalShow} onHide={() => setModalShow(false)} />
      )}
    </>
  );
};

export default SinglePet;
