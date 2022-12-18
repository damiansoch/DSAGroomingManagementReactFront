import axios from 'axios';
import Cookies from 'universal-cookie';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const EditPetForm = ({ currentPet, editPetRequest, setEditPetRequest }) => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  //form change haldler
  const changeHandler = (evt) => {
    const name = evt.target.name;
    const value =
      evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
    setEditPetRequest({
      ...editPetRequest,
      [name]: value,
    });
  };

  //form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://damiansoch-001-site1.etempurl.com/api/Pets/${currentPet.id}`,
        editPetRequest,
        {
          headers: {
            Authorization: `Bearer ${cookies.get('jwt_authorisation')}`,
          },
        }
      )
      .then((res) => {
        console.log(res.status);
        navigate('/Pets');
        window.location.reload(false);
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
          value={editPetRequest.name}
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
          value={editPetRequest.type}
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
          value={editPetRequest.breed}
          onChange={(evt) => {
            changeHandler(evt);
          }}
        />
      </Form.Group>
      <Form.Group hidden className="mb-3" controlId="formBasicOwnerId">
        <Form.Label>Setect Owner's Name</Form.Label>
        <Form.Select
          name="ownerId"
          required
          defaultValue={editPetRequest.ownerId}
        >
          <option disabled defaultValue={editPetRequest.ownerId}>
            {editPetRequest.ownerId}
          </option>
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default EditPetForm;
