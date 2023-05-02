import "./messenger.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Chat() {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);

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

  const addGroup = () => {
    const newGroup = {
      id: groups.length + 1,
      name: inputValue,
    };
    setGroups([...groups, newGroup]);
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleUserClick = async (selectedUser) => {
    setSelectedUser(selectedUser);
    try {
      const res = await axios.get(
        `/conversations/find/${user._id}/${selectedUser._id}`
      );
      if (res.data) {
        setConversationId(res.data._id);
        const messagesRes = await axios.get(`/messages/${res.data._id}`);
        setMessages(messagesRes.data);
      } else {
        const newConversationRes = await axios.post("/conversations/direct", {
          senderId: user._id,
          receiverId: selectedUser._id,
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
          {users
            .filter((u) => u._id !== user._id)
            .map((u) => (
              <div
                className={`chatMenuFriend ${
                  selectedUser === u ? "active" : ""
                }`}
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
          <>
            <div>Conversation ID: {conversationId}</div>
            <div>
            {messages.map((message) => (
              <div key={message._id}>
                <div>{message.text}</div>
              </div>
            ))}
            </div>
          </>
        ) : (
          <div>
            {selectedUser
              ? `No conversation with ${selectedUser.username} yet`
              : "Select a user to start a conversation"}
          </div>
        )}
        <div className="chatInput">
          <input
            className="input"
            type="text"
            placeholder="Type your message..."
          />
          <button>Send</button>
          </div>
      </div>

      

      <div className="chatOnline">
        <div>
          Username is : {user.username} <br />
          User ID is : {user._id}
        </div>
        <input
          className="input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={addGroup}>New Group</button>
        <tr className="groupChatList">
          <td className="rectangle">Group 21</td>
          <td className="rectangle">GG</td>
          {groups.map((groups) => (
            <td className="rectangle" key={groups.id}>
              {groups.name}
            </td>
          ))}
        </tr>
      </div>
    </div>
  );
}
