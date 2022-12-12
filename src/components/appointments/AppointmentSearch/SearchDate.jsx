import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const SearchDate = ({
  searchStartDate,
  setSearchStartDate,
  searchEndDate,
  setSearchEndDate,
}) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Search by date</Card.Title>
        <Form>
          <Form.Group className="mb-3 bg-light" controlId="formBasicDateStart">
            <Form.Label>Enter start date</Form.Label>

            <Form.Control
              type="date"
              placeholder="Enter start date"
              value={searchStartDate}
              onChange={(e) => {
                setSearchStartDate(
                  new Date(e.target.value).toISOString().split("T")[0]
                );
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3 bg-light" controlId="formBasicDateEnd">
            <Form.Label>Enter end date</Form.Label>
            <Form.Control
              type="date"
              value={searchEndDate}
              onChange={(e) => {
                setSearchEndDate(
                  new Date(e.target.value).toISOString().split("T")[0]
                );
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

export default SearchDate;
