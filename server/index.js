const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const PORT = process.env.port || 5000;

const router = require('./router');
const users = require('./users.js');
const { join } = require('path');

const app = express();
const server = http.createServer(app);
const options = {
    cors: true,
    origins: "http://127.0.0.1:localhost"
}
const io = socketio(server, options);

app.use(cors());
app.use(router);

let artistsDef = [];

let rooms = []
let userList = []
let roomNum = 1;


io.on('connection', (socket) => {
    const initJoin = () => {

        socket.on('join', ({ name, room, topArtists }, callback) => {
        
        let middleArr = [];
        if (artistsDef.length > 0) {topArtists.map(item => {
            if (artistsDef.includes(item)) {
                middleArr.push(item) 
            }
        })}

        const join = () => {
            
            const { error, user } = addUser({ id: socket.id, name, room: `${room}${roomNum}`, topArtists, roomNumber: roomNum });
            
            if (topArtists.length > 0 && artistsDef.length === 0) {
                topArtists.map(item => {
                    artistsDef.push(item)
                })
            }

            if(error) return callback(error);

            socket.join(user.room);
            const usersInRoom = [];
            const roomNumber = roomNum;

            users.getUsersInRoom(user.room).map(item => {
                usersInRoom.push(item)
            })
            const otherUser = usersInRoom.filter(item => item.name !== user.name)

            let otherList;

            updateClients(usersInRoom);

            function updateClients(usersInfo) {
                io.to(user.room).emit('update', usersInRoom);
            }

            socket.join(user.room);

            if (otherUser.length > 0) {
                otherList = otherUser[0].topArtists;
            }

            socket.emit('message', { user: 'admin', text: `Hello ${name}, welcome to the chat! ${otherUser.length > 0 ? 'You are chatting with ' + otherUser[0].name : ''}` })
            socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!`});
            if (topArtists.length > 0 && otherUser.length > 0) {
                let newList = [];
                for (let item of Object.keys(topArtists)) {
                    if(otherList.includes(topArtists[item])) {
                        newList.push(` ${topArtists[item]}`)
                    }
                }
                
                io.to(user.room).emit('message', { user: 'admin', text: `You both enjoy ${newList}` });
            } else if (topArtists.length === 0 && otherUser.length > 0) {
               
                io.to(user.room).emit('message', { user: 'admin', text: `You are both listening to ${room}`}) 
            }

            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)} );
            
            if (usersInRoom.length < 2 && rooms.length === 0) {
                rooms.push({room: roomNum, users: 1})
            } else if (usersInRoom.length === 2) {
                rooms.find(item => item.room === roomNum).users = 2
                if (rooms[rooms.length - 1].users !== 0) {
                    rooms.push({room: (rooms.length + 1), users: 0})
                }
            }

            callback();
        }
        if (artistsDef.length === 0) {
            join();
        } else if (artistsDef.length > 0 && middleArr.length > 0) {
            join();
            middleArr = [];
        } else if (artistsDef.length > 0 && middleArr.length === 0) {
            rooms.push({room: rooms.length + 1, users: 0})
            roomNum++;
            join();
        }
    })};

    const start = () => {
        roomNum = 1;
        for (var i = 0; i < rooms.length; i++) {
            if (rooms[i].users < 2) {
                roomNum = rooms[i].room;
                initJoin();
                break;
             } 
        }
    }

    if (rooms.length === 0) {
        initJoin();
    }

    if (rooms.length > 0) {
        start();
    }

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});

        callback();
    });

    socket.on('disconnect', () => {
        let user = getUser(socket.id);

        function updateClients(usersInfo) {
            io.to(user.room).emit('update', usersInRoom);
        }

        rooms.find(item => item.room === user.roomNumber).users = 1;
        user = removeUser(socket.id);
        let usersInRoom = getUsersInRoom(user.room)
        socket.disconnect(true)
        
        if(user) {
            updateClients(usersInRoom)
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left` });
        }
    })
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));