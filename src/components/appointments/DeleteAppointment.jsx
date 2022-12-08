import { useContext } from 'react';
import CurrentAppointmentContext from '../../context/CurrentAppointmentContext';

const DeleteAppointment = () => {
  const { currentAppointment } = useContext(CurrentAppointmentContext);
  return (
    <>
      <h1>Delete appointment</h1>
    </>
  );
};

export default DeleteAppointment;
