import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useState } from 'react';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';

const Login = () => {
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const cookies = new Cookies();

  const login = (jwt_token) => {
    const decoded = jwt(jwt_token);
    setUser(decoded);
    cookies.set('jwt_authorisation', jwt_token, {
      expires: new Date(decoded.exp * 1000),
    });
  };
  const [errorMsg, setErrorMsg] = useState(null);

  const onChangeHandler = (e) => {
    const { name, value } = e;
    setLoginData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post('https://localhost:7162/api/Auth/login', loginData)
      .then((res) => {
        login(res.data);
        setErrorMsg(null);
        navigate('/Appointments');
      })
      .catch((err) => {
        setErrorMsg(err.response.data);
      });
  };

  return (
    <>
      <h1 className="text-center my-3">Log in</h1>
      {errorMsg && <p className="text-danger text-center">{errorMsg}</p>}
      <Form className="col-8 text-center mx-auto mb-5" onSubmit={submitForm}>
        <FloatingLabel
          controlId="floatingInput"
          label="Username"
          className="mb-3"
        >
          <Form.Control
            type="username"
            placeholder="Username"
            name="username"
            required
            value={loginData.username}
            onChange={(e) => onChangeHandler(e.target)}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={loginData.password}
            onChange={(e) => onChangeHandler(e.target)}
          />
        </FloatingLabel>
        <Button variant="outline-primary" type="Submit" className="mt-3">
          LogIn
        </Button>
      </Form>
    </>
  );
};

export default Login;