import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Menu from './components/Menu';
import Appointments from './components/appointments/Appointments';
import Owners from './components/owners/Owners';
import Pets from './components/pets/Pets';
import AddAppointment from './components/appointments/AddAppointment';
import AddOwner from './components/owners/AddOwner';
import Login from './components/login/Login';
import { UserProvider } from './context/UserContext';
import Logout from './components/login/Logout';
import SingleAddointmentModal from './components/appointments/SingleAddointmentModal';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Menu />
        <div className="container">
          <Routes>
            {/* Login */}
            <Route path="/" element={<Login />} />
            <Route path="/Logout" element={<Logout />} />
            {/* Appointments */}
            <Route path="/Appointments" element={<Appointments />} />
            <Route
              path="/SingleAppointmentModal"
              element={<SingleAddointmentModal />}
            />
            <Route path="/AddAppointment" element={<AddAppointment />} />
            {/* Owners */}

            <Route path="/owners" element={<Owners />} />
            <Route path="/AddOwners" element={<AddOwner />} />

            {/* Pets */}
            <Route path="/Pets" element={<Pets />} />
          </Routes>
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
