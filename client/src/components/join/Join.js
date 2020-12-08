import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';
import querystring from 'query-string';
import SpotifyWebApi from 'spotify-web-api-js';

const Join = () => {
    const value=querystring.parse(window.location.href);
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [topArtists, setArtists] = useState([]);
    const spotifyApi = new SpotifyWebApi;

    const url = `/chat?name=${name}&room=${room}${topArtists.length > 0 ? `&topartists=${topArtists}` : '' }`

    useEffect(() => {
        if (value.song) {
            spotifyApi.getTrack(value.song)
            .then(function(response) {
                // console.log(response)
                setRoom(`${response.name} by ${response.artists[0].name}`)
            })
            .catch(function(err) {
                console.log(err)
            })
        } else if (value.artists) {
            setRoom('Top Artists')
            let temp = value.artists.toString().split('artist=')
            let newList = [];
            temp.map(item => {
                spotifyApi.getArtist(item)
                .then(function(response) {
                    newList.push(response.name);
                })
                .catch(function(error) {
                    console.log(error)
                })
            })
            setArtists(newList)
        } else if (value.searchedartists) {
            setRoom('Searched Artists')
            let temp = value.searchedartists.toString().split('artist=')
            let newList = [];
            temp.map(item => {
                spotifyApi.getArtist(item)
                .then(function(response) {
                    newList.push(response.name);
                })
                .catch(function(error) {
                    console.log(error)
                })
            })
            setArtists(newList)
        } 
    }, [])

    return ( 
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                <div id="chatType">Chat for: {room}</div>
                <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={url}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div> 
    );
}
 
export default Join;