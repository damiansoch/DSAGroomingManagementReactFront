import Table from 'react-bootstrap/Table';

const SingleOwner = ({ owners }) => {
  const ownersArray = owners.map((owner, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{owner.name}</td>
        <td>{owner.homeAddress}</td>
        <td>{owner.email}</td>
        <td>{owner.phoneNumber}</td>
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
        </tr>
      </thead>
      <tbody>{ownersArray}</tbody>
    </Table>
  );
};

export default SingleOwner;
