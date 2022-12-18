import axios from 'axios';
import Cookies from 'universal-cookie';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const AddAppointmentBody = ({
  addAppointmentRequest,
  setAddAppointmentRequest,
  petsForDropdown,
}) => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  //form change haldler
  const changeHandler = (evt) => {
    const name = evt.target.name;
    const value =
      evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
    setAddAppointmentRequest({
      ...addAppointmentRequest,
      [name]: value,
    });
  };
  console.log(addAppointmentRequest);
  //form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        'http://damiansoch-001-site1.etempurl.com/api/Appointments',
        addAppointmentRequest,
        {
          headers: {
            Authorization: `Bearer ${cookies.get('jwt_authorisation')}`,
          },
        }
      )
      .then((res) => {
        console.log(res.status);
        navigate('/Appointments');
        window.location.reload(false);
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
          value={addAppointmentRequest.date}
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
          value={addAppointmentRequest.details}
          required
          name="details"
          onChange={(evt) => {
            changeHandler(evt);
          }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPetId">
        <Form.Label>Setect pet name</Form.Label>
        <Form.Select
          name="petId"
          required
          value={addAppointmentRequest.petId}
          onChange={(evt) => {
            changeHandler(evt);
          }}
        >
          <option disabled value="">
            Choose pet
          </option>
          {petsForDropdown.map((pet, index) => (
            <option key={index} value={pet.id}>
              {pet.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddAppointmentBody;
