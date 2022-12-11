import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import EditOwnerBody from './EditOwnerBody';
import { useContext, useEffect, useState } from 'react';
import CurrentOwnerContext from '../../context/CurrentOwnerContext';

const EditOwner = (props) => {
  const { currentOwner } = useContext(CurrentOwnerContext);

  const [owner, setOwner] = useState({
    name: '',
    homeAddress: '',
    phoneNumber: '',
    email: '',
  });

  useEffect(() => {
    setOwner({
      name: currentOwner.name,
      homeAddress: currentOwner.homeAddress,
      phoneNumber: currentOwner.phoneNumber,
      email: currentOwner.email,
    });
  }, [currentOwner]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditOwnerBody
          owner={owner}
          setOwner={setOwner}
          currentOwner={currentOwner}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditOwner;
