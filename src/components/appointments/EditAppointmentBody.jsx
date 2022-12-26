import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

import Cookies from 'universal-cookie';

const EditAppointmentBody = ({
  editAppointmentRequest,
  setEditAppointmentRequest,
  currentAppointment,
}) => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  //form change haldler
  const changeHandler = (evt) => {
    const name = evt.target.name;
    const value =
      evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
    setEditAppointmentRequest({
      ...editAppointmentRequest,
      [name]: value,
    });
  };

  //form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://localhost:7162/api/Appointments/${currentAppointment.id}`,
        editAppointmentRequest,
        {
          headers: {
            Authorization: `Bearer ${cookies.get('jwt_authorisation')}`,
          },
        }
      )
      .then((res) => {
        console.log(res.status);
        navigate('/Sucess', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Form onSubmit={formSubmitHandler}>
      <Form.Group className="mb-3" controlId="formBasicDate">
        <Form.Label>Date and time</Form.Label>
        <Form.Control
          type="datetime-local"
          placeholder="Select date and time of the appointment"
          value={editAppointmentRequest.date}
          required
          name="date"
          onChange={(evt) => {
            changeHandler(evt);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDetails">
        <Form.Label>Details</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Details"
          value={editAppointmentRequest.details}
          required
          name="details"
          onChange={(evt) => {
            changeHandler(evt);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPetId">
        <Form.Select
          name="petId"
          required
          hidden
          value={editAppointmentRequest.petId}
          onChange={(evt) => {
            changeHandler(evt);
          }}
        >
          <option disabled value={editAppointmentRequest.petId}>
            {currentAppointment.pet.name}
          </option>
          ))
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default EditAppointmentBody;
