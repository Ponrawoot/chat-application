const ChatBox=()=>{
  return(
    <div className="w-full h-[10%] bg-white border-2 border-gray-800 shrink-0">
      <p className="text-center">This will be a chat box</p>
    </div>
  );
}

function App() {
  return (
  <div className="flex flex-row w-screen h-screen bg-black">
    <div className="flex flex-col w-2/5 h-full bg-gray-800">
      <div className="w-full h-[10%] justify-center">
        <p className="text-white text-center m-[5%]">This part will be chat list</p>
      </div>
    </div>

    <div className="flex flex-col w-3/5 h-full overflow-y-scroll">
      <ChatBox/>
      <ChatBox/>
      <ChatBox/>
      <ChatBox/>
      <ChatBox/>
      <ChatBox/>
      <ChatBox/>
      <ChatBox/>
      <ChatBox/>
      <ChatBox/>
      <ChatBox/>
      <ChatBox/>
      <ChatBox/>
      <ChatBox/>
      <ChatBox/>
      <ChatBox/>
      <ChatBox/>
      <ChatBox/>
    </div>
  </div>
  
  )
}

export default App;
