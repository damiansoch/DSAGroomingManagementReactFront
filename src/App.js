import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/login/Login';
import Logout from './components/login/Logout';
import Menu from './components/Menu';
import Appointments from './components/appointments/Appointments';
import EditAppointment from './components/appointments/EditAppointment';
import Owners from './components/owners/Owners';
import AddOwner from './components/owners/AddOwner';
import Pets from './components/pets/Pets';

import { UserProvider } from './context/UserContext';
import { CurrentAppointmentProvider } from './context/CurrentAppointmentContext';
import { CurrentOwnerProvider } from './context/CurrentOwnerContext';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <CurrentAppointmentProvider>
          <CurrentOwnerProvider>
            <Menu />
            <div className="container">
              <Routes>
                {/* Login */}
                <Route path="/" element={<Login />} />
                <Route path="/Logout" element={<Logout />} />

                {/* Appointments */}
                <Route path="/Appointments" element={<Appointments />} />
                <Route
                  path="/Appointments/EditAppointment"
                  element={<EditAppointment />}
                />

                {/* Owners */}

                <Route path="/owners" element={<Owners />} />
                <Route path="/AddOwners" element={<AddOwner />} />

                {/* Pets */}
                <Route path="/Pets" element={<Pets />} />
              </Routes>
            </div>
          </CurrentOwnerProvider>
        </CurrentAppointmentProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
