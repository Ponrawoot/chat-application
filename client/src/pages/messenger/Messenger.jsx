import "./messenger.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Chat() {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

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

  const addGroup = () => {
    const newGroup = {
      id: groups.length + 1,
      name: inputValue
    };
    setGroups([...groups, newGroup]);
    setInputValue('');
  }

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
        {/* Username is : {user.username} User ID is : {user._id} */}
      </div>
      <div className="chatOnline">
      <input className="input" type="text" value={inputValue} onChange={handleInputChange}/>
        <button onClick={addGroup}>New Group</button>
        <tr className="groupChatList">
          <td className="rectangle">Group 21</td>
          <td className="rectangle">GG</td>
          {groups.map(groups => (
          <td className="rectangle" key={groups.id}>{groups.name}</td>
        ))}
        </tr>
      </div>
    </div>
  );
}
