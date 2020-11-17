const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.port || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const options = {
    cors: true,
    origins: "http://127.0.0.1:localhost"
}
const io = socketio(server, options);

io.on('connection', (socket) => {
    console.log('We have a new connection!')

    socket.on('disconnect', () => {
        console.log('User has left!');
    })
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));