import { useEffect, useState } from "react";
import axios from "axios";
import SingleOwner from "./SingleOwner";
import Button from "react-bootstrap/Button";
import Cookies from "universal-cookie";

import { Link } from "react-router-dom";

const Owners = () => {
  const [owners, setOwners] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    axios
      .get("http://damiansoch-001-site1.etempurl.com/api/Owners", {
        headers: {
          Authorization: `Bearer ${cookies.get("jwt_authorisation")}`,
        },
      })
      .then((res) => {
        setOwners(res.data);
      });
  }, []);

  return (
    <>
      <h1 className="my-2 text-center">Owners</h1>
      <Link to="/AddOwners">
        <Button variant="primary" className="mb-3 me-2 float-end">
          Add Owner
        </Button>
      </Link>

      <SingleOwner owners={owners} />
    </>
  );
};

export default Owners;
