import React, { useEffect, useState } from "react";
import axios from "axios";

async function getUsers() {
  try {
    return (await axios.get("http://localhost:3001/users")).data;
  } catch (e) {
    return ["data not found"];
  }
}

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const users = await getUsers();
      console.log(users);
      setUsers(users);
    })();
    return () => {};
  }, []);
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}
