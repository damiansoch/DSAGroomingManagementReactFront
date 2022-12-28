import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Fragment, useContext, useState } from 'react';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import CurrentAppointmentContext from '../../context/CurrentAppointmentContext';
import DetailsAppointment from './DetailsAppointment';

import axios from 'axios';
import Cookies from 'universal-cookie';
import EditAppointment from './EditAppointment';

const SingleAppointment = ({
  appointments,
  searchPetName,
  searchOwnerName,
  searchStartDate,
  searchEndDate,
  startingNumber,
}) => {
  const { currentAppointment, setCurrentAppointment } = useContext(
    CurrentAppointmentContext
  );

  //-------------------------------popover for delete appointment

  const cookies = new Cookies();
  const deleteAppointmentHandler = () => {
    axios
      .delete(
        `https://damiansoch-001-site1.etempurl.com/api/Appointments/${currentAppointment.id}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.get('jwt_authorisation')}`,
          },
        }
      )

      .then((res) => {
        console.log('deleted');
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const popover = (
    <Popover id="popover-basic" className="text-center">
      <Popover.Header as="h3">Delete confirmation</Popover.Header>
      <Popover.Body>
        <p className="text-danger">This action can't be undone!"</p>
        <Button variant="danger" onClick={deleteAppointmentHandler}>
          Delete
        </Button>
        <Button variant="primary" className="mx-2" onClick={() => {}}>
          Cancel
        </Button>
      </Popover.Body>
    </Popover>
  );
  //-------------------------------------------------------------
  //------------------------filter appointments for a pet's name search
  appointments = appointments.filter((appointment) =>
    appointment.pet.name
      .toString()
      .toLowerCase()
      .includes(searchPetName.toString().toLowerCase())
  );
  //-------------------------------------------------------------
  //------------------------filter appointments for a owner's name search
  appointments = appointments.filter((appointment) =>
    appointment.pet.owner.name
      .toString()
      .toLowerCase()
      .includes(searchOwnerName.toString().toLowerCase())
  );
  //-------------------------------------------------------------
  //------------------------filter appointments by a date of the appointment
  if ((searchStartDate !== '') & (searchEndDate !== '')) {
    appointments = appointments.filter(
      (appointment) =>
        appointment.date >= searchStartDate && appointment.date <= searchEndDate
    );
  }
  //-------------------------------------------------------------

  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);

  const appiontmentsArray = appointments.map((app, index) => {
    const date = new Date(app.date);

    return (
      <tr key={index}>
        <td>
          {startingNumber ? (
            <p>{startingNumber + index + 1}</p>
          ) : (
            <p>{index + 1}</p>
          )}
        </td>
        <td>
          {date.getDate() +
            '-' +
            (date.getMonth() + 1) +
            '-' +
            date.getFullYear()}
        </td>
        <td>
          {date.getHours().toString().padStart(2, '0') +
            ':' +
            date.getMinutes().toString().padStart(2, '0')}
        </td>

        <td>{app.pet.name}</td>

        <td colSpan={5}>
          <Button
            variant="primary"
            onClick={() => {
              setModalShow(true);
              setCurrentAppointment(app);
            }}
          >
            Details
          </Button>

          <Button
            className="mx-2"
            variant="warning"
            onClick={() => {
              setEditModalShow(true);
              setCurrentAppointment(app);
            }}
          >
            Edit
          </Button>

          <OverlayTrigger trigger="focus" placement="left" overlay={popover}>
            <Button
              variant="danger"
              onClick={() => {
                setCurrentAppointment(app);
              }}
            >
              Delete
            </Button>
          </OverlayTrigger>
        </td>
      </tr>
    );
  });
  return (
    <>
      <Table striped bordered hover className="text-center my-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Time</th>
            <th>Pet</th>
            <th>Actions</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>{appiontmentsArray}</tbody>
      </Table>
      <DetailsAppointment show={modalShow} onHide={() => setModalShow(false)} />
      {currentAppointment && (
        <EditAppointment
          show={editModalShow}
          onHide={() => setEditModalShow(false)}
        />
      )}
    </>
  );
};

export default SingleAppointment;
