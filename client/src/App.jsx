import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
import { Button, Container, TextField, Typography } from "@mui/material";

function App() {
  const [message, setMassage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");

  // const socket = io("http://localhost:3300/");
  const socket = useMemo(() => io("http://localhost:3300/"), []);

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected..", socket.id); //
    });

    socket.on("received-message", (s) => console.log("received message : ", s));

    socket.on("welcome", (s) => console.log(s));

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMassage("");
  };

  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h4" component="div" gutterBottom>
          {socketId}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            value={message}
            onChange={(e) => setMassage(e.target.value)}
            id="outlined-basic"
            label="Message"
            variant="outlined"
          />
          <TextField
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            id="outlined-basic"
            label="Room"
            variant="outlined"
          />

          <Button color="primary" variant="contained" type="submit">
            Send
          </Button>
        </form>
      </Container>
    </>
  );
}

export default App;
