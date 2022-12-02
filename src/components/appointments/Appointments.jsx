import axios from 'axios';
import { useEffect, useState } from 'react';
import SingleAppointment from './SingleAppointment';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7162/api/Appointments').then((res) => {
      setAppointments(res.data);
    });
  }, []);
  return (
    <>
      <h1 className="my-5 text-center">Appointments</h1>
      <Link to="/AddAppointment">
        <Button variant="primary" className="mb-3 me-2 float-end">
          Add Appointment
        </Button>
      </Link>
      <SingleAppointment appointments={appointments} />
    </>
  );
};

export default Appointments;
