import React from 'react';
import './ChosenArtists.css';

const ChosenArtists = (props) => {
    const removeArtist = (item) => {
        let newArr = props.list.filter(artist => artist.name !== item.name)
        props.updateList(newArr)
    }

    return ( 
        <div>
            <ul id="chosenArtistsList">
                {props.list.map(item => <li key={item.name}><div className="artistName">{item.name}</div><div onClick={() => removeArtist(item)} className="removeItem">X</div></li>)}
            </ul>
        </div>
     );
}
 
export default ChosenArtists;