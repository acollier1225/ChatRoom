import React from 'react';

import { BrowserRouter as Router, Route} from 'react-router-dom'
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import SpotifyLanding from './components/Spotify/Landing/SpotifyLanding'
import Spotify from './components/Spotify/Spotify'
import './App.css';

const App = () => {
    return ( 
        <Router>
            <Route path="/" exact component={Spotify} />
            <Route path="/spotify/:token" component={SpotifyLanding} />
            <Route path="/join/:obj" component={Join} />
            <Route path="/chat" component={Chat} />
        </Router>
     );
}
 
export default App;