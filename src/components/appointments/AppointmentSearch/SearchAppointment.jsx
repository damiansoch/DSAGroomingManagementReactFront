import Dropdown from "react-bootstrap/Dropdown";
import SearchDate from "./SearchDate";
import SearchName from "./SearchName";
import SearchOwnerName from "./SearchOwnerName";

const SearchAppointment = ({
  setSearchPetName,
  searchPetName,
  searchOwnerName,
  setSearchOwnerName,
  searchStartDate,
  setSearchStartDate,
  searchEndDate,
  setSearchEndDate,
}) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" className="my-2">
        Search appointment
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <div className="px-2">
          <SearchName
            setSearchPetName={setSearchPetName}
            searchPetName={searchPetName}
          />
          <SearchOwnerName
            searchOwnerName={searchOwnerName}
            setSearchOwnerName={setSearchOwnerName}
          />
          <SearchDate
            searchStartDate={searchStartDate}
            setSearchStartDate={setSearchStartDate}
            searchEndDate={searchEndDate}
            setSearchEndDate={setSearchEndDate}
          />
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SearchAppointment;
