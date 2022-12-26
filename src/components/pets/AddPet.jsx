import axios from 'axios';
import Cookies from 'universal-cookie';

import { useEffect } from 'react';
import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import AddPetForm from './AddPetForm';

const AddPet = (props) => {
  const cookies = new Cookies();
  //interface
  const [addPetRequest, setAddPetRequest] = useState({
    name: '',
    type: '',
    breed: '',
    ownerId: '',
  });

  //getting owners for the dropdown
  const [ownersForDropdown, setOwnersForDropdown] = useState(null);
  useEffect(() => {
    axios
      .get('https://damiansoch-001-site1.etempurl.com/api/Owners', {
        headers: {
          Authorization: `Bearer ${cookies.get('jwt_authorisation')}`,
        },
      })
      .then((res) => {
        setOwnersForDropdown(res.data);
      });
  }, []);
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
        <AddPetForm
          ownersForDropdown={ownersForDropdown}
          addPetRequest={addPetRequest}
          setAddPetRequest={setAddPetRequest}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPet;
