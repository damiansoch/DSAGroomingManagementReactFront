import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import SingleAppointmentDetail from './SingleAppointmentDetail';

const SingleAppointment = ({ appointments }) => {
  const [appointment, setAppointment] = useState(null);

  const appiontmentsArray = appointments.map((appointment, index) => {
    const date = new Date(appointment.date);

    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          {date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear()}
        </td>
        <td>{date.getHours() + '-' + date.getMinutes()}</td>

        <td>{appointment.pet.owner.name}</td>
        <td>{appointment.pet.name}</td>
        <td>
          <Button
            variant="info"
            onClick={() => {
              setAppointment(appointment);
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
      {appointment && <SingleAppointmentDetail appointment={appointment} />}
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
