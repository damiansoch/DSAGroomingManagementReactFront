import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import EditPetForm from './EditPetForm';
import CurrentPetContext from '../../context/CurrentPetContext';
import { useContext, useState } from 'react';
import { useEffect } from 'react';

const EditPet = (props) => {
  const { currentPet } = useContext(CurrentPetContext);

  //interface
  const [editPetRequest, setEditPetRequest] = useState({
    name: '',
    type: '',
    breed: '',
    ownerId: '',
  });

  useEffect(() => {
    setEditPetRequest({
      name: currentPet.name,
      type: currentPet.type,
      breed: currentPet.breed,
      ownerId: currentPet.ownerID,
    });
  }, [currentPet]);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditPetForm
          currentPet={currentPet}
          editPetRequest={editPetRequest}
          setEditPetRequest={setEditPetRequest}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPet;
