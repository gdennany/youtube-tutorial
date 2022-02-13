import React, { useState, useEffect } from 'react';
import './App.css';

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

function Filter() {
  return (
    <div style={{...defaultStyle}}>
      <img alt="filter" />
      <input type="text" />
      Filter
    </div>
  );
}

function Playlist() {
  return (
    <div style={{...defaultStyle, display:'inline-block', width: "25%"}}>
      <img alt="playlist"/>
      <h3>Playlist Name</h3>
      <ul>
        <li>Song 1</li>
        <li>Song 2</li>
        <li>Song 3</li>
      </ul>
    </div>
  );
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {serverData: {}}
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 500);
  }
  render() {
    return (
      <div className="App">
        {this.state.serverData.user ?
        <div>
          <h1 style={{...defaultStyle, 'font-size': '54px'}}>
            {this.state.serverData.user.name}'s Playlists
          </h1>
          <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
          <HoursCounter playlists={this.state.serverData.user.playlists}/>
          <Filter/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
        </div> 
        : 
        <h1 style={defaultStyle}>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
