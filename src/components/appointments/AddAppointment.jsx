import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Cookies from 'universal-cookie';
import Button from 'react-bootstrap/Button';

const AddAppointment = () => {
  //getting pets for the dropdown
  const [petsData, setPetsData] = useState([]);
  const navigate = useNavigate();

  const cookies = new Cookies();
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
  //appointment intervace
  const [appointment, setAppointment] = useState({
    date: new Date(),
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
  const handleSelect = (event) => {
    const { name, value } = event.target;

    setAppointment((prev) => {
      return { ...prev, [name]: value };
    });
  };

  //submitForm
  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post('https://localhost:7162/api/Appointments', appointment, {
        headers: {
          Authorization: `Bearer ${cookies.get('jwt_authorisation')}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate('/Appointments');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
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
              value={appointment.details}
              onChange={(e) => {
                onChangeHandler(e.target);
              }}
            />
          </FloatingLabel>
          {/* <FloatingLabel controlId="details" label="Details" className="mb-3">
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
          </FloatingLabel> */}
          <Form.Select
            aria-label="Default select example"
            name="petId"
            onChange={handleSelect}
          >
            <option>Open this select menu</option>
            {petsData.map((pet) => (
              <option key={pet.id} required value={pet.id}>
                {pet.name}
              </option>
            ))}
          </Form.Select>
          <Button variant="outline-primary" className="mt-3" type="Submit">
            Add appointment
          </Button>
        </Form>
      </>
    </div>
  );
};

export default AddAppointment;
