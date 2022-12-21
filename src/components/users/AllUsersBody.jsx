import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import UserContext from '../../context/UserContext';

import axios from 'axios';
import Cookies from 'universal-cookie';

const AllUsersBody = ({ users }) => {
  const navigate = useNavigate();
  const { setUserForDelete, userForDelete } = useContext(UserContext);
  const cookies = new Cookies();
  //confirm delete

  const deleteUserHandler = () => {
    console.log(userForDelete.id);
    axios
      .delete(`https://localhost:7162/api/Users/${userForDelete.id}`, {
        headers: {
          Authorization: `Bearer ${cookies.get('jwt_authorisation')}`,
        },
      })
      .then((res) => {
        console.log('deleted');
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Confirm delete</Popover.Header>
      <Popover.Body>
        <p className="text-center text-danger">This action can't be undone!</p>
        <Button variant="danger" className="mx-2" onClick={deleteUserHandler}>
          Delete
        </Button>
        <Button
          variant="warning"
          onClick={() => {
            navigate('/Users');
          }}
        >
          Cancel
        </Button>
      </Popover.Body>
    </Popover>
  );
  return (
    <>
      <h1 className="text-center my-3">All users</h1>
      <Table striped bordered hover className="">
        <thead>
          <tr>
            <th>#</th>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users != null &&
            users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.username}</td>
                <td>{user.emailAddress}</td>
                <td>
                  <OverlayTrigger
                    trigger="focus"
                    placement="left"
                    overlay={popover}
                  >
                    <Button
                      variant="danger"
                      onClick={() => {
                        setUserForDelete(user);
                      }}
                    >
                      Delete
                    </Button>
                  </OverlayTrigger>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default AllUsersBody;
