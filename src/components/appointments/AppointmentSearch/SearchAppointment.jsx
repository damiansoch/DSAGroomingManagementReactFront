import Dropdown from 'react-bootstrap/Dropdown';
import SearchName from './SearchName';
import SearchOwnerName from './SearchOwnerName';

const SearchAppointment = ({
  setSearchPetName,
  searchPetName,
  searchOwnerName,
  setSearchOwnerName,
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
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SearchAppointment;
