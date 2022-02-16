import React from 'react';
import queryString from 'query-string';
import './App.css';

let DEV_BACKEND_LOGIN = 'http://localhost:8888/login';
let PROD_BACKEND_LOGIN = 'https://youtube-tutorial1-backend.herokuapp.com/login'

let defaultStyle = {
  color: '#fff',
}

let fakeServerData = {
  user: {
    name: 'Grant',
    playlists: [
      {
        name: 'My favorites',
        songs: [
          {name: 'Beat It', duration: 1345}, 
          {name: 'Cannelloni Makaroni', duration: 1236},
          {name: 'Rosa helikopter', duration: 70000}
        ]
      },
      {
        name: 'Discover Weekly',
        songs: [
          {name: 'Beat It', duration: 1345}, 
          {name: 'Cannelloni Makaroni', duration: 1236},
          {name: 'Rosa helikopter', duration: 70000}
        ]
      },
      {
        name: 'Another playlist - the best!',
        songs: [
          {name: 'Beat It', duration: 1345}, 
          {name: 'Cannelloni Makaroni', duration: 1236},
          {name: 'Rosa helikopter', duration: 70000}
        ]
      },
      {
        name: 'Playlist - yeah!',
        songs: [
          {name: 'Beat It', duration: 1345}, 
          {name: 'Cannelloni Makaroni', duration: 1236},
          {name: 'Rosa helikopter', duration: 70000}
        ]
      }
    ]
  }
};

function PlaylistCounter({ playlists }) {
  return (
    <div style={{...defaultStyle, width: '40%' , display: 'inline-block'}}>
      <h2 style={{...defaultStyle}}>{playlists.length} Text</h2>
    </div>
  );
}

function HoursCounter({ playlists }) {
  let allSongs = playlists.reduce((songs, currentPlaylist) => {
    return songs.concat(currentPlaylist.songs);
  }, []);
  let totalDuration = allSongs.reduce((sum, currentSong) => {
    return sum + currentSong.duration;
  }, 0);
  return (
    <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
      <h2 style={{...defaultStyle}}>{Math.round(totalDuration / 60)} Hours</h2>
    </div>
  );
}

/*
class HoursCounter extends React.Component {
  render() {
    let allSongs = this.props.playlists.reduce
    return (
      <div></div>
    );
  }
}
*/

function Filter(props) {
  return (
    <div style={{...defaultStyle}}>
      <img alt="filter" />
      <input type="text" onKeyUp={event => props.onTextChange(event.target.value)} />
      Filter
    </div>
  );
}

function Playlist(props) {
  return (
    <div style={{...defaultStyle, display:'inline-block', width: "25%"}}>
      <img alt="playlist"/>
      <h3>{props.playlist.name}</h3>
      <ul>
        <li>{props.playlist.songs[0].name}</li>
        <li>{props.playlist.songs[1].name}</li>
        <li>{props.playlist.songs[2].name}</li>
      </ul>
    </div>
  );
}

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: '',
    }
  };
  componentDidMount() {
    let parsed  = queryString.parse(window.location.search);
    let accessToken = parsed.access_token

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({serverData : {user: {name : data.display_name}}}));
  };

  render() {
    let playlistToRender = 
      this.state.serverData.user && 
      this.state.serverData.user.playlists
        ? this.state.serverData.user.playlists.filter(playlist => 
          playlist.name.toLowerCase().includes(
            this.state.filterString.toLocaleLowerCase())) 
        : []

    return (
      <div className="App">
        {this.state.serverData.user ?
        <div>
          <h1 style={{...defaultStyle, 'font-size': '54px'}}>
            {this.state.serverData.user.name}'s Playlists
          </h1>
          <PlaylistCounter playlists={playlistToRender}/>
          <HoursCounter playlists={playlistToRender}/>
          <Filter onTextChange={text => this.setState({filterString: text})}/>
          {playlistToRender.map(playlist => <Playlist playlist={playlist} />
          )}
        </div> 
        : 
        <button onClick={() => window.location = DEV_BACKEND_LOGIN}
        style={{padding:'20px', 'fontSize': '50px', 'marginTop': '20px'}}>
           Sign in with Spotify 
        </button>
        }
      </div>
    );
  }
}

export default App;
