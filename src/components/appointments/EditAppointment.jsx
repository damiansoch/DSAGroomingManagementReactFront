import { useContext } from 'react';
import CurrentAppointmentContext from '../../context/CurrentAppointmentContext';

const EditAppointment = () => {
  const { currentAppointment } = useContext(CurrentAppointmentContext);
  console.log(currentAppointment);
  return (
    <>
      <h1>Edit appointment</h1>
    </>
  );
};

export default EditAppointment;
