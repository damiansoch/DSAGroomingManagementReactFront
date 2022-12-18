import { useState } from 'react';
import { createContext } from 'react';

const CurrentAppointmentContext = createContext();

export function CurrentAppointmentProvider({ children }) {
  const [currentAppointment, setCurrentAppointment] = useState(null);
  // console.log(currentAppointment);
  return (
    <CurrentAppointmentContext.Provider
      value={{ currentAppointment, setCurrentAppointment }}
    >
      {children}
    </CurrentAppointmentContext.Provider>
  );
}
export default CurrentAppointmentContext;
