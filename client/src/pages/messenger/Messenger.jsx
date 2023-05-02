import "./messenger.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {Link} from "react-router-dom";

export default function Chat() {
  const [users, setUsers] = useState([]);

  const [user, setUser] = useState("");

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem("user"));
    //console.log("User ID from storage:", userFromStorage._id);
    setUser(userFromStorage);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/users/all");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);



  return (
    <div className="chat">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search for friends" className="chatMenuInput" />
          {users.map((u) => (
            <div className="chatMenuFriend">
              {/* <img className="chatMenuImg" src={u.profilePicture} alt="" /> */}
              <span className="chatMenuName">{u.username}</span>
              {/* <span className="chatMenuId">{u._id}</span> */}
            </div>
          ))}
        </div>
      </div>
      <div className="chatBox"></div>
      <div>
        Username is : {user.username} User ID is : {user._id}
      </div>
      <div className="chatOnline">
        <button>
        <Link to='/groupchat'>New room</Link>
        </button>
      </div>
    </div>
  );
}
