import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const EditAppointmentModal = (props) => {
  var cookies = new Cookies();
  var navigate = useNavigate();
  const [petsData, setPetsData] = useState([]);

  //appointment intervace
  const [appointment, setAppointment] = useState({
    date: props.appointment.date,
    details: props.appointment.details,
    petId: props.appointment.petId,
  });

  //onChangeForm
  const onChangeHandler = (e) => {
    const { name, value } = e;
    setAppointment((prev) => {
      return { ...prev, [name]: value };
    });
  };

  //pets for select
  useEffect(() => {
    axios
      .get('https://localhost:7162/api/Pets', {
        headers: {
          Authorization: `Bearer ${cookies.get('jwt_authorisation')}`,
        },
      })
      .then((res) => {
        setPetsData(res.data);
      });
  }, []);

  //submitForm
  const submitForm = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://localhost:7162/api/Appointments/${props.appointment.id}`,
        appointment,
        {
          headers: {
            Authorization: `Bearer ${cookies.get('jwt_authorisation')}`,
          },
        }
      )
      .then((res) => {
        navigate('/Appointments');
        props.onHide();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center my-5">
          <h1>Add appointment</h1>
          <>
            <Form onSubmit={submitForm}>
              <FloatingLabel
                controlId="date"
                label="Date of appointment"
                className="mb-3 mt-5"
              >
                <Form.Control
                  type="datetime-local"
                  placeholder="Date of appointment"
                  name="date"
                  required
                  value={appointment.date}
                  onChange={(e) => {
                    onChangeHandler(e.target);
                  }}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingTextarea2"
                label="Details"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: '100px' }}
                  name="details"
                  required
                  minLength={3}
                  value={appointment.details}
                  onChange={(e) => {
                    onChangeHandler(e.target);
                  }}
                />
              </FloatingLabel>

              <Form.Select aria-label="Default select example" name="petId">
                <option>{props.appointment.pet.name}</option>
              </Form.Select>
              <Button variant="outline-warning" className="mt-3" type="Submit">
                Save Changes
              </Button>
            </Form>
          </>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditAppointmentModal;
