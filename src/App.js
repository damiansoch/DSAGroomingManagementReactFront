import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Menu from './components/Menu';
import Appointments from './components/appointments/Appointments';
import Owners from './components/owners/Owners';
import Pets from './components/pets/Pets';
import Login from './components/login/Login';
import { UserProvider } from './context/UserContext';
import Logout from './components/login/Logout';
import { CurrentAppointmentProvider } from './context/CurrentAppointmentContext';
import EditAppointment from './components/appointments/EditAppointment';
import DetailsAppointment from './components/appointments/DetailsAppointment';
import DeleteAppointment from './components/appointments/DeleteAppointment';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <CurrentAppointmentProvider>
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
              <Route
                path="/Appointments/DeleteAppointment"
                element={<DeleteAppointment />}
              />
              <Route
                path="/Appointments/DetailsAppointment"
                element={<DetailsAppointment />}
              />

              {/* Owners */}

              <Route path="/owners" element={<Owners />} />

              {/* Pets */}
              <Route path="/Pets" element={<Pets />} />
            </Routes>
          </div>
        </CurrentAppointmentProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
