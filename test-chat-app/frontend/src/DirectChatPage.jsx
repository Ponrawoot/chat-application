import React, { useState } from "react";

import { ChatEngine, getOrCreateChat } from "react-chat-engine";

import axios from "axios";
import AllUsers from "./AllUsers";

const DirectChatPage = (data) => {
  const [username, setUsername] = useState("");
  const { userName } = data;

  function createDirectChat(creds) {
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [username] },
      () => setUsername("")
    );
  }

  function renderChatForm(creds) {
    return (
      <div>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={() => createDirectChat(creds)}>Create</button>
      </div>
    );
  }

  // chatengine: login 
  // allusers: show users info
  return (
    <>
      <ChatEngine
        height="100vh"
        userName={userName}
        userSecret="123456"
        projectID="025449c7-e41d-4f36-a330-00b69652ac56"
        renderNewChatForm={(creds) => renderChatForm(creds)}
      />
	  <AllUsers/>
    </>
  );
};

export default DirectChatPage;
