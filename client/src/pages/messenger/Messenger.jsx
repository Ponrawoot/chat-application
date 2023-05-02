import "./messenger.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Chat() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem("user"));
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

  const handleUserClick = async (selectedUser) => {
    setSelectedUser(selectedUser);
    try {
      const res = await axios.get(`/conversations/find/${user._id}/${selectedUser._id}`);
      if (res.data) {
        setConversationId(res.data._id);
      } else {
        const newConversationRes = await axios.post("/conversations/direct", {
          senderId: user._id,
          receiverId: selectedUser._id
        });
        setConversationId(newConversationRes.data._id);
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className="chat">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search for friends" className="chatMenuInput" />
          {users
            .filter((u) => u._id !== user._id)
            .map((u) => (
              <div
                className={`chatMenuFriend ${selectedUser === u ? "active" : ""}`}
                key={u._id}
                onClick={() => handleUserClick(u)}
              >
                <span className="chatMenuName">{u.username}</span>
              </div>
            ))}
        </div>
      </div>
      <div className="chatBox">
        {selectedUser && conversationId ? (
          <div>Conversation ID: {conversationId}</div>
        ) : (
          <div>
            {selectedUser
              ? `No conversation with ${selectedUser.username} yet`
              : "Select a user to start a conversation"}
          </div>
        )}
      </div>
      <div className="chatOnline">
        <button>
          <Link to="/groupchat">New room</Link>
        </button>
        <div>
          Username is : {user.username} <br />
          User ID is : {user._id}
        </div>
      </div>
    </div>
  );
}
