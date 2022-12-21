import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState } from 'react';
import Cookies from 'universal-cookie';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddOwnerForm = () => {
  //errMsh
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const cookies = new Cookies();

  const [owner, setOwner] = useState({
    name: '',
    homeAddress: '',
    phoneNumber: '',
    email: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e;
    setOwner((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post('https://localhost:7162/api/Owners', owner, {
        headers: {
          Authorization: `Bearer ${cookies.get('jwt_authorisation')}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate('/Sucess', { replace: true });
      })
      .catch((err) => {
        setErrMsg(err.response.data);
      });
  };
  return (
    <>
      <p className="text-center text-danger mt-5">{errMsg}</p>
      <Form className="col-8 text-center mx-auto " onSubmit={submitForm}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel>Name</FloatingLabel>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            required
            value={owner.name}
            onChange={(e) => onChangeHandler(e.target)}
            minLength={3}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter address"
            name="homeAddress"
            required
            value={owner.homeAddress}
            onChange={(e) => onChangeHandler(e.target)}
            minLength={3}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel>Phone number</FloatingLabel>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            name="phoneNumber"
            required
            value={owner.phoneNumber}
            onChange={(e) => onChangeHandler(e.target)}
            minLength={3}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel>Email Adderss</FloatingLabel>
          <Form.Control
            type="emai'"
            placeholder="Enter email address"
            name="email"
            required
            value={owner.email}
            onChange={(e) => onChangeHandler(e.target)}
            minLength={3}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddOwnerForm;
