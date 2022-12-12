import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const SearchName = ({ setSearchPetName, searchPetName }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Search by pet's name</Card.Title>
        <Form>
          <Form.Group className="mb-3 bg-light" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={searchPetName}
              onChange={(e) => {
                setSearchPetName(e.target.value);
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

export default SearchName;
