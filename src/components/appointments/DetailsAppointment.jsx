import { useContext } from 'react';
import CurrentAppointmentContext from '../../context/CurrentAppointmentContext';

const DetailsAppointment = () => {
  const { currentAppointment } = useContext(CurrentAppointmentContext);
  return (
    <>
      <h1>Details appointment</h1>
    </>
  );
};

export default DetailsAppointment;
