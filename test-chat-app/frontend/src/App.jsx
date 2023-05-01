import { useState } from "react";

import "./App.css";

import AuthPage from "./AuthPage";
import ChatsPage from "./ChatsPage";
import { ChatEngine } from "react-chat-engine";
import DirectChatPage from "./DirectChatPage";

function App() {
  const [user, setUser] = useState(undefined);

  if (!user) {
    return <AuthPage onAuth={(user) => setUser(user)} />;
  } else {
    console.log(user)
    return (
      <DirectChatPage
        projectID="025449c7-e41d-4f36-a330-00b69652ac56"
        userName={user.username}
      />
    );
  }
}

export default App;

// import { ChatEngine } from "react-chat-engine";
// function App() {
//   return (
//     <ChatEngine
//       projectID="025449c7-e41d-4f36-a330-00b69652ac56"
//       userName="adam"
//       userSecret="pass1234"
//     />
//   );
// }
