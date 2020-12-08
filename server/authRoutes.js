const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const encodeFormData = require('./helperFunctions/encodeFormData.js')
const querystring = require("querystring");
const axios = require('axios');
const { response, query } = require("express");

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET
const REDIRECTURL = process.env.REACT_APP_REDIRECTURL

router.get('/login', async (req, res) => {
    var scopes = 'user-top-read app-remote-control user-read-private user-read-email user-modify-playback-state user-read-playback-state user-read-currently-playing user-library-modify user-library-read playlist-read-private playlist-modify-public';
    res.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + CLIENT_ID +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent(REDIRECTURL) + '&show_dialog=true');
})


router.get('/callback', async (req, res) => {

    axios({
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        params: {
            grant_type: "authorization_code",
            code: req.query.code,
            redirect_uri: REDIRECTURL
          },
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          auth: {
            username: CLIENT_ID,
            password: CLIENT_SECRET
          }
        }).then(function(response) {
            res.redirect('http://localhost:3000/spotify/' + 
            querystring.stringify({
                '#': '#',
                access_token: response.data.access_token,
                refresh_token: response.data.refresh_token
            })
        )
            console.log(response)
        })
        .catch(function(error) {
            console.log(error)
    }) 
})

router.get("/getUser/:token", async (req, res) => {
    await fetch("https://api.spotify.com/v1/me", {
        headers: {
            "Authorization": `Bearer ${req.params.token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        userID = data.id;
        res.json(data)
    })
})

router.get("/playlists/:token", async (req, res) => {
    await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
            "Authorization": `Bearer ${req.params.token}`
        }
    })
    .then(response => response.json())
    .then(data => res.json(data))
})

router.post("/search/:token", async (req, res) => {
    let unchangedQueryBody = req.body.message.split(" ");
    let changedQueryBody = unchangedQueryBody.join("%20");
    fetch(`https://api.spotify.com/v1/search?q=${changedQueryBody}&type=artist,track`, {
        headers: {
            "Authorization": `Bearer ${req.params.token}`
        }
    })
    .then( resp => resp.json())
    .then( data => res.json(data));
})

module.exports = router;