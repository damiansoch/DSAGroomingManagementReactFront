import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const SingleAddointmentModal = (props) => {
  const date = new Date(props.appointment.date);
  const cookies = new Cookies();
  const navigate = useNavigate();

  //delete appointment
  const deleteAppointmentHandler = () => {
    console.log(props.appointment.id);
    axios({
      url: `https://localhost:7162/api/Appointments/${props.appointment.id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.get('jwt_authorisation')}`,
      },
      method: 'delete',
    })
      .then((res) => {
        props.onHide();
        navigate('/Appointments');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Details of {props.appointment.pet.name} appointment on
            {' ' +
              date.getDate() +
              '-' +
              date.getMonth() +
              '-' +
              date.getFullYear()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table
            striped
            bordered
            hover
            variant="dark"
            className="mb-5 mt-3 text-center"
          >
            <thead>
              <tr>
                <th>Date and Time</th>
                <th>Pet name</th>
                <th>Owner</th>
                <th>Owner's phone number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {date.getDate() +
                    '-' +
                    date.getMonth() +
                    '-' +
                    date.getFullYear() +
                    ' / ' +
                    date.getHours().toString().padStart(2, '0') +
                    ':' +
                    date.getMinutes().toString().padStart(2, '0')}
                </td>
                <td>{props.appointment.pet.name}</td>
                <td>{props.appointment.pet.owner.name}</td>
                <td>{props.appointment.pet.owner.phoneNumber}</td>
              </tr>
              <tr>
                <td colSpan={4}>
                  <h5>Details:</h5>
                </td>
              </tr>

              <tr>
                <td colSpan={4}>{props.appointment.details}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning">Edit</Button>
          <Button variant="danger" onClick={deleteAppointmentHandler}>
            Delete
          </Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SingleAddointmentModal;
