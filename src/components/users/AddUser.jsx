import axios from "axios";
import Cookies from "universal-cookie";

import React, { useState } from "react";
import { useEffect } from "react";

import AddUserBody from "./AddUserBody";

const AddUser = () => {
  const cookies = new Cookies();

  //add user request interface
  const [addUserRequest, setAddUserRequest] = useState({
    username: "",
    emailAddress: "",
    password: "",
    firstName: "",
    lastName: "",
    roleIds: [],
  });

  const [userRoles, setUserRoles] = useState([]);

  // getting all roles for the select
  useEffect(() => {
    axios
      .get("https://localhost:7162/api/Roles", {
        headers: {
          Authorization: `Bearer ${cookies.get("jwt_authorisation")}`,
        },
      })
      .then((res) => {
        setUserRoles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <AddUserBody
        addUserRequest={addUserRequest}
        setAddUserRequest={setAddUserRequest}
        userRoles={userRoles}
      />
    </div>
  );
};

export default AddUser;
