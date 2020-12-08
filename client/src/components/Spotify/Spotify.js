import React from 'react';
import './Spotify.css'
import { Link } from 'react-router-dom'

const Spotify = () => {
  return ( 
    <div id="loginPage">
      <h1>Welcome to Spotify Chat!</h1>
      <h3>Login to your Spotify account and meet users with similar taste!</h3>
      <a href='http://localhost:5001/login' > <button id="loginButton">Login with Spotify!</button></a>
    </div>
   );
}

export default Spotify;