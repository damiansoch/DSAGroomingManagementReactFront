import axios from 'axios';
import Cookies from 'universal-cookie';

import { useEffect, useState } from 'react';
import { useContext } from 'react';

import SingleAppointment from './SingleAppointment';

import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import UserContext from '../../context/UserContext';
import AddAppointment from './AddAppointment';
import SearchAppointment from './AppointmentSearch/SearchAppointment';

const AppointmentByTheDate = () => {
  const [loading, setLoading] = useState(false);

  const { logout } = useContext(UserContext);
  //date params
  const [date, setDate] = useState(new Date());

  //use state for searches
  const [searchPetName, setSearchPetName] = useState('');
  const [searchOwnerName, setSearchOwnerName] = useState('');
  const [searchStartDate, setSearchStartDate] = useState('');
  const [searchEndDate, setSearchEndDate] = useState('');

  //----------------------

  const [appointments, setAppointments] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const cookies = new Cookies();
  //getting all the appointments
  useEffect(() => {
    axios
      .get(
        `https://damiansoch-001-site1.etempurl.com/api/Appointments/${(
          1 + date.getMonth()
        )
          .toString()
          .padStart(2, '0')}-${date
          .getDate()
          .toString()
          .padStart(2, '0')}-${date.getFullYear()}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.get('jwt_authorisation')}`,
          },
        }
      )

      .then((res) => {
        setAppointments(res.data);
      })
      .catch((err) => {
        console.log(err.message);
        if (err.message === 'Network Error') {
          logout();
        }
      })
      .finally(() => {
        setLoading(true);
      });
  }, []);

  return (
    <>
      <div className="text-end my-2 ">
        <Button
          onClick={() => {
            setSearchPetName('');
            setSearchOwnerName('');
            setSearchStartDate('');
            setSearchEndDate('');
          }}
        >
          Clear all search
        </Button>
        <SearchAppointment
          setSearchPetName={setSearchPetName}
          searchPetName={searchPetName}
          searchOwnerName={searchOwnerName}
          setSearchOwnerName={setSearchOwnerName}
          searchStartDate={searchStartDate}
          setSearchStartDate={setSearchStartDate}
          searchEndDate={searchEndDate}
          setSearchEndDate={setSearchEndDate}
        />

        <h1 className="my-2 text-center">Appointments</h1>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Add Appointment
        </Button>
        {loading ? (
          <SingleAppointment
            appointments={appointments}
            searchPetName={searchPetName}
            searchOwnerName={searchOwnerName}
            searchStartDate={searchStartDate}
            searchEndDate={searchEndDate}
          />
        ) : (
          <Spinner
            animation="border"
            variant="danger"
            style={{
              position: 'fixed',
              top: '49%',
              left: '49%',
            }}
          />
        )}
        <AddAppointment show={modalShow} onHide={() => setModalShow(false)} />
        <Container>
          <Row>
            <Col className="text-end">
              <Button variant="success" onClick={() => {}}>
                Prev
              </Button>
            </Col>
            <Col></Col>
            <Col className="text-start">
              <Button variant="success" onClick={() => {}}>
                Next
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AppointmentByTheDate;
