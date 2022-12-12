import Dropdown from 'react-bootstrap/Dropdown';
import SearchName from './SearchName';

const SearchAppointment = ({ setSearchPetName, searchPetName }) => {
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
        </div>
        <Dropdown.Item>Another action</Dropdown.Item>
        <Dropdown.Item>Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SearchAppointment;
