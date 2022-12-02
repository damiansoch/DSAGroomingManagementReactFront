import Table from 'react-bootstrap/Table';

const SinglePet = ({ pets }) => {
  const petArray = pets.map((pet, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{pet.name}</td>
        <td>{pet.type}</td>
        <td>{pet.breed}</td>
        <td>{pet.owner.name}</td>
        <td>{pet.owner.phoneNumber}</td>
      </tr>
    );
  });
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Breed</th>
            <th>Owner</th>
            <th>Owner's phone number</th>
          </tr>
        </thead>
        <tbody>{petArray}</tbody>
      </Table>
    </>
  );
};

export default SinglePet;
