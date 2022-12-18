import axios from 'axios';
import Cookies from 'universal-cookie';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const AddUserBody = ({ addUserRequest, setAddUserRequest, userRoles }) => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  //handle form change
  const changeHandler = (evt) => {
    const name = evt.target.name;
    const value =
      evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
    setAddUserRequest({
      ...addUserRequest,
      [name]: value,
    });
  };
  //handle multi select
  const handleSelect = function (selectedItems) {
    const roles = [];
    const name = 'roleIds';

    for (let i = 0; i < selectedItems.length; i++) {
      roles.push(selectedItems[i].value);
    }
    setAddUserRequest({
      ...addUserRequest,
      [name]: roles,
    });
  };

  //form submit handler

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        'http://damiansoch-001-site1.etempurl.com/api/Users',
        addUserRequest,
        {
          headers: {
            Authorization: `Bearer ${cookies.get('jwt_authorisation')}`,
          },
        }
      )
      .then((res) => {
        console.log('user added');
        navigate('/Users');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1>Add user</h1>
      <Form className="col-6 mx-auto mt-5" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicFName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            required
            name="firstName"
            minLength={3}
            value={addUserRequest.firstName}
            onChange={(e) => {
              changeHandler(e);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter surname"
            required
            minLength={3}
            name="lastName"
            value={addUserRequest.lastName}
            onChange={(e) => {
              changeHandler(e);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="emailAddress"
            placeholder="Enter email address"
            required
            value={addUserRequest.emailAddress}
            onChange={(e) => {
              changeHandler(e);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            required
            minLength={3}
            name="username"
            value={addUserRequest.username}
            onChange={(e) => {
              changeHandler(e);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter password"
            required
            minLength={6}
            name="password"
            value={addUserRequest.password}
            onChange={(e) => {
              changeHandler(e);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicRoles">
          <Form.Label>Roles</Form.Label>
          <Form.Select
            aria-label="Default select example"
            required
            multiple={true}
            name="roleIds"
            onChange={(e) => {
              handleSelect(e.target.selectedOptions);
            }}
          >
            {userRoles.map((role, index) => (
              <option key={index} defaultChecked value={role.id}>
                {role.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddUserBody;
