import axios from 'axios';
import { useEffect, useState } from 'react';
import SingleAppointment from './SingleAppointment';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState([]);
  const cookies = new Cookies();
  //getting all the appointments
  useEffect(() => {
    axios
      .get('https://localhost:7162/api/Appointments', {
        headers: {
          Authorization: `Bearer ${cookies.get('jwt_authorisation')}`,
        },
      })
      .then((res) => {
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
