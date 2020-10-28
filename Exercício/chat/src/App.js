import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import React, { useEffect, useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const [name, setName] = useState("");

  const [logged, setLogged] = useState(false);

  const [connection, setConnection] = useState(null);

  useEffect(() => {
    if (connection) {
      connection.onopen = function () {
        console.log("Connection open!");
        connection.send(JSON.stringify({ type: "login", name: name }));
      };
      connection.onclose = function () {
        console.log("Connection closed");
      };
      connection.onmessage = function (e) {
        var server_message = JSON.parse(e.data);
        setMessages((m) => [...m, server_message]);
      };
    }
  }, [connection, name]);

  return (
    <Box width="100%" display="flex" justifyContent="center" marginTop="200px">
      {logged ? (
        <Paper
          elevation={8}
          style={{
            height: "500px",
            width: "1000px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "20px",
            justifyContent: "space-between",
          }}
        >
          <List
            style={{
              height: "400px",
              width: "95%",
              overflowY: "scroll",
              boxShadow: "0 0 8px #888888",
            }}
          >
            {messages.map((message, i) => (
              <ListItem key={i}>
                <ListItemText primary={`${message.name}: ${message.message}`} />
              </ListItem>
            ))}
          </List>
          <Box flexGrow={1} display="flex" alignItems="center" width="95%">
            <TextField
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Digite uma mensagem"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  connection.send(
                    JSON.stringify({ type: "message", message: text })
                  );
                  setText("");
                }
              }}
              style={{ width: "100%" }}
            />
            <IconButton
              variant="contained"
              disabled={text.length <= 0}
              onClick={() => {
                connection.send(
                  JSON.stringify({ type: "message", message: text })
                );
                setText("");
              }}
              style={{
                color: "white",
                backgroundColor: text.length <= 0 ? "lightgrey" : "teal",
                marginLeft: "30px",
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      ) : (
        <Paper
          elevation={8}
          style={{
            padding: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <TextField
            variant="outlined"
            label="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setConnection(new WebSocket("ws://localhost:7474/chat"));
                setLogged(true);
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={name.length <= 0}
            onClick={() => {
              setConnection(new WebSocket("ws://localhost:7474/chat"));
              setLogged(true);
            }}
            style={{ width: "50%", marginTop: "10px" }}
          >
            Login
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export default App;
