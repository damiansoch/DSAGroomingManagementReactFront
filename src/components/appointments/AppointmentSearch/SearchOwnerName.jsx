import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const SearchOwnerName = ({ searchOwnerName, setSearchOwnerName }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Search by owner's name</Card.Title>
        <Form>
          <Form.Group className="mb-3 bg-light" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={searchOwnerName}
              onChange={(e) => {
                setSearchOwnerName(e.target.value);
              }}
            />
          </Form.Group>

          {/* <Button variant="primary" type="submit">
        Submit
      </Button> */}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SearchOwnerName;
