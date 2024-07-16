const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST']
    }
});

app.get("/", (req, res) => {
    res.send('<h1 style="text-align: center">socket server: on</h1>');
});

io.on('connection', (socket) => {
    console.log(`user ${socket.id} is connected`);

    socket.on('disconnect', () => {
        console.log(`user ${socket.id} left`)
    });

    socket.on("message", (data) => {
        console.log("message received by the server: " + data);
        // socket.broadcast.emit("message:received", data);
        // console.log("message sent by the server: " + data);
    });
});

server.listen(8888, () => {
    console.log('server is listenning on http://localhost:8888');
});