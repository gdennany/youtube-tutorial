import './App.css';

let defaultStyle = {
  color: '#fff',
}

function Aggregate() {
  return (
    <div style={{...defaultStyle, width: '40%' , display: 'inline-block'}}>
      <h2 style={{...defaultStyle}}>Number Text</h2>
    </div>
  );
}

function Filter() {
  return (
    <div style={{...defaultStyle}}>
      <img alt="filter image" />
      <input type="text" />
      Filter
    </div>
  );
}

function Playlist() {
  return (
    <div style={{...defaultStyle, display:'inline-block', width: "25%"}}>
      <img alt="playlist image"/>
      <h3>Playlist Name</h3>
      <ul>
        <li>Song 1</li>
        <li>Song 2</li>
        <li>Song 3</li>
      </ul>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1 style={{...defaultStyle}}>Title</h1>
      <Aggregate />
      <Aggregate />
      <Filter />
      <Playlist />
      <Playlist />
      <Playlist />
      <Playlist />
    </div>
  );
}

export default App;
