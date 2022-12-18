import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddAppointmentBody from './AddAppointmentBody';

import axios from 'axios';
import Cookies from 'universal-cookie';

import { useState } from 'react';
import { useEffect } from 'react';

const AddAppointment = (props) => {
  //interface

  const [addAppointmentRequest, setAddAppointmentRequest] = useState({
    date: new Date(),
    details: '',
    petId: '',
  });

  //getting pets for the dropdown
  const [petsForDropdown, setPetsForDropdown] = useState();

  const cookies = new Cookies();
  useEffect(() => {
    axios
      .get('http://damiansoch-001-site1.etempurl.com/api/Pets', {
        headers: {
          Authorization: `Bearer ${cookies.get('jwt_authorisation')}`,
        },
      })
      .then((res) => {
        setPetsForDropdown(res.data);
      })
      .catch((err) => {
        console.log(err);
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
        <AddAppointmentBody
          setAddAppointmentRequest={setAddAppointmentRequest}
          petsForDropdown={petsForDropdown}
          addAppointmentRequest={addAppointmentRequest}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAppointment;
