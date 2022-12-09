import axios from 'axios';
import { useEffect, useState } from 'react';
import SingleAppointment from './SingleAppointment';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';

const Appointments = () => {
  const { logout } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
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
      })
      .catch((err) => {
        console.log(err.message);
        if (err.message === 'Network Error') {
          logout();
        }
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
