import React, { Component } from 'react';
import Artist from './Artist';
import Tracks from './Tracks';

const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com';

class App extends Component {
  state = {
    artistQuery: '',
    artist: null,
    tracks: []
  };

  updateArtistQuery = (event) => {
    this.setState({ artistQuery: event.target.value });
  }

  searchArtist = () => {
    fetch(`${API_ADDRESS}/artist/${this.state.artistQuery}`)
      .then(response => response.json())
      .then(json => {
        if (json.artists.total > 0) {
          const artist = json.artists.items[0];
          this.setState({ artist: artist });
          this.searchArtistTopTracks(artist.id);
        };
      })
      .catch(error => console.log(error));
  }

  searchArtistTopTracks = (id) => {
    fetch(`${API_ADDRESS}/artist/${id}/top-tracks`)
      .then(response => response.json())
      .then(json => {
        this.setState({ tracks: json.tracks });
        console.log('this.state', this.state);
      })
      .catch(error => console.log(error));
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.searchArtist();
    };
  }

  render() {
    return (
      <div>
        <h2>Music Master</h2>
        <input
          onKeyPress={this.handleKeyPress}
          onChange={this.updateArtistQuery} placeholder='Search for an Artist' />
        <button onClick={this.searchArtist}>Search</button>
        <div>
          <Artist artist={this.state.artist} />
          <Tracks tracks={this.state.tracks} />
        </div>
      </div>
    );
  }
}

export default App;
