import Table from "react-bootstrap/Table";

const AllUsersBody = ({ users }) => {
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
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default AllUsersBody;
