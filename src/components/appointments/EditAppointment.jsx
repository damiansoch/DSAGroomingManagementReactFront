import axios from 'axios';
import Cookies from 'universal-cookie';

import { useContext, useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import CurrentAppointmentContext from '../../context/CurrentAppointmentContext';
import EditAppointmentBody from './EditAppointmentBody';

const EditAppointment = (props) => {
  const cookies = new Cookies();
  const { currentAppointment } = useContext(CurrentAppointmentContext);

  //editAppointmentRequest interface
  const [editAppointmentRequest, setEditAppointmentRequest] = useState({
    date: '',
    details: '',
    petId: '',
  });
  useEffect(() => {
    setEditAppointmentRequest({
      date: currentAppointment.date,
      details: currentAppointment.details,
      petId: currentAppointment.petId,
    });
  }, [currentAppointment]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit appointment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <EditAppointmentBody
          editAppointmentRequest={editAppointmentRequest}
          setEditAppointmentRequest={setEditAppointmentRequest}
          currentAppointment={currentAppointment}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditAppointment;
