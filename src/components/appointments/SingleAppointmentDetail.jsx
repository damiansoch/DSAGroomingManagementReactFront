import Table from 'react-bootstrap/Table';

const SingleAppointmentDetail = ({ appointment }) => {
  const date = new Date(appointment.date);
  return (
    <>
      <h3>Choosen appointmnet</h3>
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
            <th>Owner,s phone number</th>
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
            <td>{appointment.pet.name}</td>
            <td>{appointment.pet.owner.name}</td>
            <td>{appointment.pet.owner.phoneNumber}</td>
          </tr>
          <tr>
            <td colSpan={4}>
              <h5>Details:</h5>
            </td>
          </tr>

          <tr>
            <td colSpan={4}>{appointment.details}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default SingleAppointmentDetail;
