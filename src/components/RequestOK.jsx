import Card from 'react-bootstrap/Card';

const RequestOK = () => {
  return (
    <Card bg="success" className="text-center my-5">
      <Card.Body>
        <h3 className="text-white">Your request was processed sucesfully.</h3>
      </Card.Body>
    </Card>
  );
};

export default RequestOK;
