import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import './SpotifyLanding.css'
import Listening from '../Listening/Listening';
import querystring from 'query-string';
import axios from 'axios';
import { Link } from 'react-router-dom'
import TopArtists from '../TopArtists/TopArtists';
import CreateRoom from '../CreateRoom/CreateRoom';
import Search from '../Search/Search';

const spotifyApi = new SpotifyWebApi();
let token;

class SpotifyLanding extends Component {
    constructor(){
        super();
        this.getHashParams()
        this.state = {
            loggedIn: token ? true : false,
            nowPlaying: { id: ''},
            topArtists: [],
            searchedArtists: []
        }
      }

      getHashParams() {
          const value=querystring.parse(window.location.href);
          token=value.access_token;
          spotifyApi.setAccessToken(token);
      }

      getNowPlaying = (id) => {
        this.setState({
          nowPlaying: { 
                id: id
              }
        })
      }

      getTopArtists = (arr) => {
        this.setState({
          topArtists: arr
        })
      }

      getSearchedArtists = (arr) => {
        let middleArr = []
        arr.map(item => {
          middleArr.push(item.id)
        })
        this.setState({
          searchedArtists: middleArr
        })
      }
      

      render() {
        return (
          <div className="SpotifyLanding">
            <Search getSearchedArtists={this.getSearchedArtists} />
            <div id="create">
              <CreateRoom song={this.state.nowPlaying.id} artists={this.state.topArtists} searchedArtists={this.state.searchedArtists} />
            </div>
            <div id="nowPlaying">
                <Listening token={token} sendInfo={this.getNowPlaying} />
            </div>
            <div id="topArtists">
                <br />
                <TopArtists getTopArtists={this.getTopArtists} token={token} />
            </div>
            
          </div>
        );
    }
}
 
export default SpotifyLanding;