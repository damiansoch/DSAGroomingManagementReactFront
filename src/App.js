import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Menu from './components/Menu';
import Appointments from './components/appointments/Appointments';
import Owners from './components/owners/Owners';
import Pets from './components/pets/Pets';
import SingleAppointmentDetail from './components/appointments/SingleAppointmentDetail';
import AddAppointment from './components/appointments/AddAppointment';
import AddOwner from './components/owners/AddOwner';

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <div className="container">
        <Routes>
          {/* Appointments */}
          <Route path="/" element={<Appointments />} />
          <Route
            path="/SingleAppointmentDedail"
            element={<SingleAppointmentDetail />}
          />
          <Route path="/AddAppointment" element={<AddAppointment />} />
          {/* Owners */}

          <Route path="/owners" element={<Owners />} />
          <Route path="/AddOwners" element={<AddOwner />} />

          {/* Pets */}
          <Route path="/Pets" element={<Pets />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
