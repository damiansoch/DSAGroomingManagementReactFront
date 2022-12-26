import axios from 'axios';
import Cookies from 'universal-cookie';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const AddPetForm = ({ ownersForDropdown, addPetRequest, setAddPetRequest }) => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  //form change haldler
  const changeHandler = (evt) => {
    const name = evt.target.name;
    const value =
      evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
    setAddPetRequest({
      ...addPetRequest,
      [name]: value,
    });
  };

  //form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post('https://localhost:7162/api/Pets', addPetRequest, {
        headers: {
          Authorization: `Bearer ${cookies.get('jwt_authorisation')}`,
        },
      })
      .then((res) => {
        console.log(res.status);
        navigate('/Sucess', { replace: true });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <Form onSubmit={formSubmitHandler}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter pet's name"
          value={addPetRequest.name}
          onChange={(evt) => {
            changeHandler(evt);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicType">
        <Form.Label>Type</Form.Label>
        <Form.Control
          type="text"
          name="type"
          placeholder="Enter pet's type (f.e. dog)"
          value={addPetRequest.type}
          onChange={(evt) => {
            changeHandler(evt);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicBreed">
        <Form.Label>Breed</Form.Label>
        <Form.Control
          type="text"
          name="breed"
          placeholder="Enter pet's breed"
          value={addPetRequest.breed}
          onChange={(evt) => {
            changeHandler(evt);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicOwnerId">
        <Form.Label>Setect Owner's Name</Form.Label>
        <Form.Select
          name="ownerId"
          required
          value={addPetRequest.ownerId}
          onChange={(evt) => {
            changeHandler(evt);
          }}
        >
          <option disabled value="">
            Choose owner
          </option>
          {ownersForDropdown.map((owner, index) => (
            <option key={index} value={owner.id}>
              {owner.name}
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

export default AddPetForm;
