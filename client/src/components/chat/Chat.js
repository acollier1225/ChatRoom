import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import './Chat.css';
import Users from './Users';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    // const [topArtists, setArtists] = useState([]);
    const ENDPOINT = 'https://react-spotify-chat-application.herokuapp.com/';
    const topArtists = []

    useEffect(() => {
        const { name, room, topartists, searchedartists } = queryString.parse(location.search);
        if (topartists) {let temp = topartists.split(",")
        temp.map(item => {
            topArtists.push(item)
        })}

        if (searchedartists) {let temp = topartists.split(",")
        temp.map(item => {
            topArtists.push(item)
        })}
        
        socket = io(ENDPOINT)
        

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room, topArtists }, () => {
            
            
        });
        
        socket.on('update', (data) => {
            console.log(data)
            
            let middleArr = [];
            data.map(item => {
                middleArr.push(item.name)
            })
            setUsers([middleArr.join(", ")])
            middleArr = [];
        })

        return () => {
            socket.emit('disconnection');

            socket.close();
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
        console.log(messages)
    }, [messages, users])

    

    const sendMessage = (event) => {
        event.preventDefault();
        console.log(messages)

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    return ( 
        <div className="outerContainer">
            <div className="container">
                
                <InfoBar room={room} users={users.join(" ")} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    );
}
 
export default Chat;