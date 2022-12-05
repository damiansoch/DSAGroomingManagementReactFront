import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Cookies from 'universal-cookie';

const AddAppointment = () => {
  //getting pets for the dropdown
  const [pets, setPets] = useState([]);
  const cookies = new Cookies();
  useEffect(() => {
    axios
      .get('https://localhost:7162/api/Pets', {
        headers: {
          Authorization: `Bearer ${cookies.get('jwt_authorisation')}`,
        },
      })
      .then((res) => {
        setPets(res.data);
      });
  }, []);
  //appointment intervace
  const [appointment, setAppointment] = useState({
    date: null,
    details: '',
    petId: '',
  });
  console.log(appointment);
  //onChangeForm
  const onChangeHandler = (e) => {
    const { name, value } = e;
    setAppointment((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <div className="text-center my-5">
      <h1>Add appointment</h1>
      <>
        <FloatingLabel
          controlId="floatingInput"
          label="Date of appointment"
          className="mb-3 mt-5"
        >
          <Form.Control
            type="datetime-local"
            placeholder="Date of appointment"
            name="date"
            required
            value={appointment.details}
            onChange={(e) => {
              onChangeHandler(e.target);
            }}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Details"
          className="mb-3"
        >
          <Form.Control
            as="textarea"
            type="text"
            placeholder="Details"
            name="details"
            required
            value={appointment.details}
            onChange={(e) => {
              onChangeHandler(e.target);
            }}
          />
        </FloatingLabel>
        <Form.Select aria-label="Default select example" name="petId">
          <option>Open this select menu</option>
          {pets.map((pet) => (
            <option
              key={pet.Id}
              required
              value={appointment.petId}
              onChange={(e) => {
                onChangeHandler(e.target);
              }}
            >
              {pet.name}
            </option>
          ))}
          {/* <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option> */}
        </Form.Select>
      </>
    </div>
  );
};

export default AddAppointment;
