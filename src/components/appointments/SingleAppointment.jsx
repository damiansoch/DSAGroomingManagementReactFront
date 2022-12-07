import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import SingleAddointmentModal from './SingleAddointmentModal';

const SingleAppointment = ({ appointments }) => {
  const [appointment, setAppointment] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const appiontmentsArray = appointments.map((app, index) => {
    const date = new Date(app.date);

    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          {date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear()}
        </td>
        <td>
          {date.getHours().toString().padStart(2, '0') +
            ':' +
            date.getMinutes().toString().padStart(2, '0')}
        </td>

        <td>{app.pet.owner.name}</td>
        <td>{app.pet.name}</td>
        <td>
          <Button
            className="mx-1 my-1"
            variant="primary"
            size="sm"
            onClick={() => {
              setModalShow(true);
              setAppointment(app);
            }}
          >
            Details
          </Button>
        </td>
      </tr>
    );
  });
  return (
    <>
      {appointment && (
        <SingleAddointmentModal
          appointment={appointment}
          show={modalShow}
          onHide={() => {
            setModalShow(false);
          }}
        />
      )}
      <h3>All apointments</h3>
      <Table striped bordered hover className="text-center my-1">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Time</th>
            <th>Owner</th>
            <th>Pet</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{appiontmentsArray}</tbody>
      </Table>
    </>
  );
};

export default SingleAppointment;
