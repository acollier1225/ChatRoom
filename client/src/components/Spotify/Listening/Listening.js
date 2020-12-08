import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import './Listening.css';

const Listening = (props) => {
    const [song, changeSong] = useState({})
    const [warning, changeWarning] = useState(false)

    const spotifyApi = new SpotifyWebApi();

    useEffect(() => {
        getNowPlaying();
    }, []);

    const getNowPlaying = () => {
        spotifyApi.getMyCurrentPlaybackState()
          .then((response) => {
              if (!response) {
                changeWarning(true)
            } else {
                changeWarning(false)
                changeSong({
                    name: response.item.name,
                    artist: response.item.artists[0].name,
                    art: response.item.album.images[0].url,
                    album: response.item.album.name,
                    id: response.item.id
                })
                props.sendInfo(response.item.id)
            }})
          .catch()
      }
    

    return ( 
        <div className="listening">
            <button onClick={() => getNowPlaying()}>
                Check Now Playing
            </button>
            {warning ? <div>You are not currently playing a song!</div> : null}
            <br />
            {song.art ? <img src={song.art} />  : null }
            <br />
            {song.name}
            <br />
            {song.artist}
            <br />
            {song.album}
        </div>
     );
}
 
export default Listening;