import { useContext } from 'react';
import CurrentAppointmentContext from '../../context/CurrentAppointmentContext';

const EditAppointment = () => {
  const { currentAppointment } = useContext(CurrentAppointmentContext);
  return (
    <>
      <h1>Edit appointment</h1>
    </>
  );
};

export default EditAppointment;