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
import AppointmentTopButtons from './AppointmentTopButtons';

const Appointments = () => {
  const [loading, setLoading] = useState(false);

  const { logout } = useContext(UserContext);
  //skip-take params
  const [skipTake, setSkipTake] = useState({
    skip: 0,
    take: 10,
  });
  //use state for searches
  const [searchPetName, setSearchPetName] = useState('');
  const [searchOwnerName, setSearchOwnerName] = useState('');

  //----------------------

  const [appointments, setAppointments] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const cookies = new Cookies();
  //getting all the appointments
  useEffect(() => {
    axios
      .get(
        `https://damiansoch-001-site1.etempurl.com/AllAppointments/${skipTake.skip},${skipTake.take}`,
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
          // logout();
        }
      })
      .finally(() => {
        setLoading(true);
      });
  }, [skipTake.skip]);

  return (
    <>
      <div className="text-end my-4 ">
        <AppointmentTopButtons
          setModalShow={setModalShow}
          setSearchPetName={setSearchPetName}
          setSearchOwnerName={setSearchOwnerName}
          searchPetName={searchPetName}
          searchOwnerName={searchOwnerName}
        />

        <h1 className="my-4 text-center">Appointments </h1>

        {loading ? (
          <SingleAppointment
            appointments={appointments}
            searchPetName={searchPetName}
            searchOwnerName={searchOwnerName}
            startingNumber={skipTake.skip}
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
              <Button
                disabled={skipTake.skip <= 0}
                variant="success"
                onClick={() => {
                  setSkipTake({
                    skip: skipTake.skip - 10,
                    take: 10,
                  });
                }}
              >
                Prev
              </Button>
            </Col>
            <Col></Col>
            <Col className="text-start">
              <Button
                disabled={appointments.length < skipTake.take}
                variant="success"
                onClick={() => {
                  setSkipTake({
                    skip: skipTake.skip + 10,
                    take: 10,
                  });
                }}
              >
                Next
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Appointments;
