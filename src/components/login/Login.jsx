import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { useState } from 'react';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import { Col, Container } from 'react-bootstrap';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const cookies = new Cookies();

  const login = (jwt_token) => {
    let decoded = jwt(jwt_token);
    setUser(decoded);

    axios
      .get(
        `https://damiansoch-001-site1.etempurl.com/api/Users/${decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']}`
      )
      .then((res) => {
        // console.log(res.data.refreshToken);
        setInterval(() => {
          axios({
            url: 'https://damiansoch-001-site1.etempurl.com/api/Auth/refresh-token',
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'post',
            data: res.data.refreshToken,
          }).then((res) => {
            decoded = jwt(res.data);
            console.log(res.data);
            cookies.set('jwt_authorisation', res.data, {
              expires: new Date(decoded.exp * 1000),
            });
          });
        }, 300000);
      });
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
    setLoading(true);
    e.preventDefault();
    axios
      .post(
        'https://damiansoch-001-site1.etempurl.com/api/Auth/login',
        loginData
      )
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
        <Button variant="outline-primary" type="Submit" className=" my-3 ">
          <span style={{ heigth: '100%' }}>LogIn</span>
        </Button>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="danger" className="me-2" />
          </div>
        ) : (
          <></>
        )}
      </Form>
      <Container>
        <Col className="text-center">
          <img width={'200px'} src="/img/clipart14264.png" alt="dog" />
        </Col>
      </Container>
    </>
  );
};

export default Login;
