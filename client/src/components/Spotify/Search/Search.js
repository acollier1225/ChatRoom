import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import ChosenArtists from '../ChosenArtists/ChosenArtists';
import './Search.css';

const spotifyApi = new SpotifyWebApi();

const Search = (props) => {
    const [term, searchTerm] = useState('')
    const [results, setResults] = useState([])
    const [selectedList, setList] = useState([])

    var prev = null;

    useEffect(() => {
        console.log('ding!')
        console.log(selectedList)
        props.getSearchedArtists(selectedList)
    }, [selectedList])

    function onUserInput(queryTerm) {
    // abort previous request, if any
    if (prev !== null) {
        prev.abort();
    }

    // store the current promise in case we need to abort it
    prev = spotifyApi.searchArtists(queryTerm, { limit: 5 });
    prev.then(
        function (data) {
        // clean the promise so it doesn't call abort
        prev = null;
        // console.log(data.artists.items)
        let middleArr = []
        data.artists.items.map(item => {
            middleArr.push(item)
        })
        setResults([middleArr])
        
        // ...render list of search results...
        },
        function (err) {
            console.error(err);
        }
    );
    }

    const searching = (event) => {
        if(event.target.value === '') {
            setResults([])
        } else {
            searchTerm(event.target.value)
            onUserInput(term)
        }
        
    }

    const addItem = (item) => {
        
        if (selectedList.includes(item)) {
            console.log('included already!')
            return
        } else if (selectedList.length < 10) {
            
            setList([...selectedList, item])
            console.log(selectedList)
        }
        
        props.getSearchedArtists(selectedList)
        // console.log(selectedList)
    }
    
    const updateList = (item) => {
        setList(item)
        props.getSearchedArtists(selectedList)
    }

    return ( 
        <div id="searchBar">
            You May Select Up to 10 Artists
            <br />
            Search for an Artist
            <br />
            <input onChange={(event) => searching(event)}></input>
            <ul id="searchResults">
                {results.length ? results[0].map(item => <li><span className="artist">{item.name}</span><div className="addSearch" onClick={() => addItem(item)}>+</div></li>) : null}
            </ul>
            <ChosenArtists updateList={updateList} list={selectedList} />
        </div>
    );
}
 
export default Search;