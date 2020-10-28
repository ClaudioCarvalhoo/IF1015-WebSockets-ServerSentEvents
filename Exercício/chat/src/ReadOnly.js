import { Box, List, ListItem, ListItemText, Paper } from "@material-ui/core";
import React, { useState } from "react";

function ReadOnly() {
  const [messages, setMessages] = useState([]);

  const [source] = useState(new EventSource("http://localhost:4747"));

  source.onmessage = function (event) {
    let message = JSON.parse(event.data);
    setMessages((m) => [...m, message]);
  };

  return (
    <Box width="100%" display="flex" justifyContent="center" marginTop="200px">
      <Paper
        elevation={8}
        style={{
          height: "500px",
          width: "1000px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "20px",
          paddingBottom: "20px",
          justifyContent: "space-between",
        }}
      >
        <List
          style={{
            height: "100%",
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
      </Paper>
    </Box>
  );
}

export default ReadOnly;
