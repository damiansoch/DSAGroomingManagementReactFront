import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SearchAppointment from './AppointmentSearch/SearchAppointment';

const AppointmentTopButtons = ({
  setModalShow,
  setSearchPetName,
  setSearchOwnerName,
  searchPetName,
  searchOwnerName,
}) => {
  return (
    <Alert variant="light" className=" p-2 rounded-3">
      <Row>
        <Col className="col-2">
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Add Appointment
          </Button>
        </Col>
        <Col className="col-6"></Col>
        <Col>
          <Button
            variant="outline-primary"
            onClick={() => {
              setSearchPetName('');
              setSearchOwnerName('');
            }}
          >
            Clear all search
          </Button>
        </Col>
        <Col>
          <SearchAppointment
            setSearchPetName={setSearchPetName}
            searchPetName={searchPetName}
            searchOwnerName={searchOwnerName}
            setSearchOwnerName={setSearchOwnerName}
          />
        </Col>
      </Row>
    </Alert>
  );
};

export default AppointmentTopButtons;
