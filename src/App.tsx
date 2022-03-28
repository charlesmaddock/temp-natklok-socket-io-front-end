import { io } from "socket.io-client";

function App() {
  const socket = io("localhost:3001");

  const handleConnect = () => {
    socket.connect();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <button onClick={handleConnect}>Connect</button>
    </div>
  );
}

export default App;
