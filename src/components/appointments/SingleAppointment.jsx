import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import CurrentAppointmentContext from "../../context/CurrentAppointmentContext";
import DetailsAppointment from "./DetailsAppointment";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AddAppointment from "./AddAppointmentBody";

const SingleAppointment = ({ appointments }) => {
  const { setCurrentAppointment } = useContext(CurrentAppointmentContext);

  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);

  const appiontmentsArray = appointments.map((app, index) => {
    const date = new Date(app.date);

    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          {date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()}
        </td>
        <td>
          {date.getHours().toString().padStart(2, "0") +
            ":" +
            date.getMinutes().toString().padStart(2, "0")}
        </td>

        <td>{app.pet.owner.name}</td>
        <td>{app.pet.name}</td>
        <td>
          <Button
            variant="primary"
            onClick={() => {
              setModalShow(true);
              setCurrentAppointment(app);
            }}
          >
            Details
          </Button>

          <Button
            className="mx-2"
            variant="warning"
            onClick={() => setEditModalShow(true)}
          >
            Edit
          </Button>

          <Link to="DeleteAppointment">
            <Button
              className="mx-1 my-1"
              variant="danger"
              size="sm"
              onClick={() => {
                setCurrentAppointment(app);
              }}
            >
              Delete
            </Button>
          </Link>
        </td>
      </tr>
    );
  });
  return (
    <>
      <Table striped bordered hover className="text-center my-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Time</th>
            <th>Owner</th>
            <th>Pet</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{appiontmentsArray}</tbody>
      </Table>
      <DetailsAppointment show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default SingleAppointment;
