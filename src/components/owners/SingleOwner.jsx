import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import { useContext } from 'react';

import CurrentOwnerContext from '../../context/CurrentOwnerContext';

import Cookies from 'universal-cookie';
import axios from 'axios';

const SingleOwner = ({ owners }) => {
  const { currentOwner, setCurrentOwner } = useContext(CurrentOwnerContext);
  const cookies = new Cookies();
  const ownersArray = owners.map((owner, index) => {
    //popover for delete owner

    const deleteOwnerHandler = () => {
      axios
        .delete(`https://localhost:7162/api/Owners/${currentOwner.id}`, {
          headers: {
            Authorization: `Bearer ${cookies.get('jwt_authorisation')}`,
          },
        })
        .then((res) => {
          console.log('Owner deleted');
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const popover = (
      <Popover id="popover-basic" className="text-center">
        <Popover.Header as="h3">Delete confirmation</Popover.Header>
        <Popover.Body>
          <p className="text-danger">This action can't be undone!"</p>
          <Button variant="danger" onClick={deleteOwnerHandler}>
            Delete
          </Button>
          <Button variant="primary" className="mx-2" onClick={() => {}}>
            Cancell
          </Button>
        </Popover.Body>
      </Popover>
    );

    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{owner.name}</td>
        <td>{owner.homeAddress}</td>
        <td>{owner.email}</td>
        <td>{owner.phoneNumber}</td>
        <td>
          <Button variant="warning" className="mx-2 my-2">
            Edit
          </Button>
          <OverlayTrigger trigger="focus" placement="left" overlay={popover}>
            <Button
              variant="danger"
              onClick={() => {
                setCurrentOwner(owner);
              }}
            >
              Delete
            </Button>
          </OverlayTrigger>
        </td>
      </tr>
    );
  });
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Address</th>
          <th>Email</th>
          <th>Phone number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{ownersArray}</tbody>
    </Table>
  );
};

export default SingleOwner;
