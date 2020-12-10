import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Dropdown from '../Dropdown/Dropdown';
import './CreateRoom.css'

const CreateRoom = (props) => {
    const [choice, choose] = useState('')
    const [artists, change] = useState(props.artists)
    const [type, select] = useState('')
    const [chosenArtists, changeSearched] = useState(props.searchedArtists)
    const [warning, setWarning] = useState('')

    useEffect(() => {
        change(props.artists)
        if (type === 'Top Artists') {
            choose(
                `artists=artist=${artists.join("artist=")}`
            )
        }
    }, [props.artists])

    useEffect(() => {
        changeSearched(props.searchedArtists)
        
        if (type === 'Searched Artists') {
            choose(
                `searchedartists=artist=${chosenArtists.join("artist=")}`
            )
        }
    })

    useEffect(() => {
        check();
    })

    const chooseRoom = (item) => {
        select(item)
        if (item === 'Same Song') {
                choose(`song=${props.song}`)
        } else if (item === 'Top Artists') {
            choose(
                `artists=artist=${artists.join("artist=")}`
            )
        } else if (item === 'Searched Artists') {
            choose(
                `searchedartists=artist=${chosenArtists.join("artist=")}`
            )
        }
    }

    const check = () => {
        if (type === 'Searched Artists' && chosenArtists.length === 0) {
            setWarning('You have no selected artists!')
            
        } else if (type === 'Top Artists' && artists.length === 0) {
            setWarning('You have no top artists!')
            

        } else if (type === 'Same Song' && !props.song) {
            setWarning('You are not currently playing a song!')
        } else {
            setWarning('')
        }
    }

    return ( <div>
        {type !== '' && warning === '' ? <Link to={`/join/&${choice}`}>
            <button id="joinRoom" type="submit">Join a Chat Room!</button>
        </Link> : ''}
        {warning}
        <br />
        Join a chat for...
        <Dropdown check={check} chooseRoom={chooseRoom} />
    </div> );
}
 
export default CreateRoom;