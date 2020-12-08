import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import './TopArtists.css';

const TopArtists = (props) => {
    const [list, setList] = useState([]);
    const spotifyApi = new SpotifyWebApi();

    useEffect(() => {
        getTopArtists();
    }, [])

    const getTopArtists = () => {
        spotifyApi.getMyTopArtists()
          .then((response) => {
                let newList = [];
                let idList = [];
                response.items.map(item => {
                    newList.push({
                        img: item.images[0].url,
                        name: item.name,
                        id: item.id
                    })
                    idList.push(item.id)
                })
                setList(newList)
                props.getTopArtists(idList);
            } 
          )
      }

      const handleDelete = (name) => {
          let newList = list.filter(item => item.name !== name)
          let idList = [];
          newList.map(item => {
              idList.push(item.id)
          })
          props.getTopArtists(idList);
          setList(newList);
      }

    return ( 
        <div>
            Top Artists
            <ul id="topArtists">
                {list.map(item => <li key={item.name}>{item.name}<span className="delete" onClick={() => handleDelete(item.name)}>X</span><br/><img src={item.img} /></li>)}
            </ul>
        </div>
     );
}
 
export default TopArtists;