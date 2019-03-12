import React from 'react';

const Tracks = ({ tracks }) => {
    console.log('tracks', tracks);
    const TRACKS = tracks;
    if (TRACKS.length > 0) {
        console.log('uslo');

        return (
            <div>
                <h3>Tracks View</h3>
                {
                    TRACKS.map((track) => (
                        <div key={track.id}>
                            <p>{track.name}</p>
                            <img src={track.album.images[2].url} alt="track-img" />
                        </div>
                    ))
                }
            </div>

        );
    } else {
        return (
            <div></div>
        );
    }
}

export default Tracks;