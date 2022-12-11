import axios from 'axios';
import { useEffect, useState } from 'react';
import SingleAppointment from './SingleAppointment';
import Button from 'react-bootstrap/Button';
import Cookies from 'universal-cookie';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import AddAppointment from './AddAppointment';

const Appointments = () => {
  const { logout } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [modalShow, setModalShow] = useState(false);
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
    <div className="text-end ">
      <h1 className="my-2 text-center">Appointments</h1>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add Appointment
      </Button>
      <SingleAppointment appointments={appointments} />
      <AddAppointment show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default Appointments;
