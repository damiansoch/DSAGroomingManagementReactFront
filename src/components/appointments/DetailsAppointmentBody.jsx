import { useContext } from "react";
import Table from "react-bootstrap/Table";
import CurrentAppointmentContext from "../../context/CurrentAppointmentContext";

const DetailsAppointmentBody = () => {
  const { currentAppointment } = useContext(CurrentAppointmentContext);
  console.log(currentAppointment);
  const date = new Date(currentAppointment.date);

  return (
    <>
      <Table striped bordered hover size="lg" className="text-center">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Pet Name</th>
            <th>Owner Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {" "}
              {date.getDate() +
                "-" +
                date.getMonth() +
                "-" +
                date.getFullYear()}
            </td>
            <td>
              {date.getHours().toString().padStart(2, "0") +
                ":" +
                date.getMinutes().toString().padStart(2, "0")}
            </td>
            <td>{currentAppointment.pet.name}</td>
            <td>{currentAppointment.pet.owner.name}</td>
          </tr>
          <tr>
            <td colSpan={4}>{currentAppointment.details}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default DetailsAppointmentBody;
