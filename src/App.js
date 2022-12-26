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
import { CurrentPetProvider } from './context/CurrentPetContext';
import AllUsers from './components/users/AllUsers';
import AddUser from './components/users/AddUser';
import RequestOK from './components/RequestOK';
import AppointmentByTheDate from './components/appointments/AppointmentByTheDate';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <CurrentAppointmentProvider>
          <CurrentOwnerProvider>
            <CurrentPetProvider>
              <Menu />
              <div className="container">
                <Routes>
                  <Route path="/Sucess" element={<RequestOK />} />
                  {/* Login */}
                  <Route path="/" element={<Login />} />
                  <Route path="/Logout" element={<Logout />} />

                  {/* Appointments */}
                  <Route path="/Appointments" element={<Appointments />} />
                  <Route
                    path="/Appointments/EditAppointment"
                    element={<EditAppointment />}
                  />
                  <Route
                    path="/AppointmentsByTheDate"
                    element={<AppointmentByTheDate />}
                  />

                  {/* Owners */}

                  <Route path="/owners" element={<Owners />} />
                  <Route path="/AddOwners" element={<AddOwner />} />

                  {/* Pets */}
                  <Route path="/Pets" element={<Pets />} />

                  {/* Users */}
                  <Route path="/Users" element={<AllUsers />} />
                  <Route path="/Users/AddUser" element={<AddUser />} />
                </Routes>
              </div>
            </CurrentPetProvider>
          </CurrentOwnerProvider>
        </CurrentAppointmentProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
