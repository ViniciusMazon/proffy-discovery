const express = require('express');
const server = express();

server.use(express.static("public"));

server.get('/', (req, res) => res.sendFile(__dirname + "/src/views/index.html"));
server.get('/study', (req, res) => res.sendFile(__dirname + "/src/views/study.html"));
server.get('/give-classes', (req, res) => res.sendFile(__dirname + "/src/views/give-classes.html"));

server.listen(3333, () => console.log("⚡️  Server running on port 3333"));
