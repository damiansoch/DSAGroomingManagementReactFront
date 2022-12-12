import axios from "axios";
import { useEffect, useState } from "react";
import SingleAppointment from "./SingleAppointment";
import Button from "react-bootstrap/Button";
import Cookies from "universal-cookie";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import AddAppointment from "./AddAppointment";
import SearchAppointment from "./AppointmentSearch/SearchAppointment";

const Appointments = () => {
  const { logout } = useContext(UserContext);
  //use state for searches
  const [searchPetName, setSearchPetName] = useState("");
  const [searchOwnerName, setSearchOwnerName] = useState("");
  const [searchStartDate, setSearchStartDate] = useState(
    new Date("01-01-1971").toISOString().split("T")[0]
  );
  const [searchEndDate, setSearchEndDate] = useState(
    new Date("01-01-2060").toISOString().split("T")[0]
  );
  console.log(searchStartDate);
  console.log(searchEndDate);
  //----------------------

  const [appointments, setAppointments] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const cookies = new Cookies();
  //getting all the appointments
  useEffect(() => {
    axios
      .get("https://localhost:7162/api/Appointments", {
        headers: {
          Authorization: `Bearer ${cookies.get("jwt_authorisation")}`,
        },
      })
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((err) => {
        console.log(err.message);
        if (err.message === "Network Error") {
          logout();
        }
      });
  }, []);

  return (
    <div className="text-end ">
      <Button
        onClick={() => {
          setSearchPetName("");
          setSearchOwnerName("");
        }}
      >
        Clear all search
      </Button>
      <SearchAppointment
        setSearchPetName={setSearchPetName}
        searchPetName={searchPetName}
        searchOwnerName={searchOwnerName}
        setSearchOwnerName={setSearchOwnerName}
        searchStartDate={searchStartDate}
        setSearchStartDate={setSearchStartDate}
        searchEndDate={searchEndDate}
        setSearchEndDate={setSearchEndDate}
      />

      <h1 className="my-2 text-center">Appointments</h1>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add Appointment
      </Button>
      <SingleAppointment
        appointments={appointments}
        searchPetName={searchPetName}
        searchOwnerName={searchOwnerName}
        searchStartDate={searchStartDate}
        searchEndDate={searchEndDate}
      />
      <AddAppointment show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default Appointments;
