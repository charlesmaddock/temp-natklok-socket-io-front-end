import { useState, useEffect } from "react";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3001", {
  transports: ["websocket"],
});

function App() {
  const [roomToJoinId, setRoomToJoinId] = useState("");
  const [createdRoomId, setCreatedRoomId] = useState("");

  const [questionId, setQuestionId] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  useEffect(() => {
    socket.on("roomCreated", (data) => {
      setCreatedRoomId(data.roomId);
    });

    socket.on("roomJoined", (data) => {
      alert("Room joined!");
    });
  }, []);

  const handleCreateRoom = () => {
    socket.emit("requestCreateRoom");
  };

  const handleJoinRoom = () => {
    let payload = {
      roomId: roomToJoinId,
    };
    socket.emit("joinRoom", payload);
  };

  const handleAnsweredQuestion = () => {
    console.log(handleAnsweredQuestion);
    let payload = {
      questionId: questionId,
      isCorrect: isCorrect,
    };
    socket.send("answerQuestion", payload);
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
      <div
        style={{ background: "rgba(0,0,0,0.09)", borderRadius: 6, padding: 10 }}
      >
        <h3 style={{ margin: 0 }}>Temp socket server front-end</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 6,
          }}
        >
          <button onClick={handleCreateRoom}>Create room</button>
          <p style={{ margin: 0 }}>{createdRoomId}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 6,
          }}
        >
          <input
            placeholder="Room's code"
            onChange={(e) => setRoomToJoinId(e.target.value)}
          />
          <button onClick={handleJoinRoom}>Connect to room</button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 6,
          }}
        >
          <input
            placeholder="Question's ID"
            onChange={(e) => setQuestionId(e.target.value)}
          />
          <input
            type="checkbox"
            onChange={(e) => setIsCorrect(e.target.checked)}
            checked={isCorrect}
          />
          <button onClick={handleAnsweredQuestion}>Answer</button>
        </div>
      </div>
    </div>
  );
}

export default App;
