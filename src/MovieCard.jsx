import React from 'react';

const MovieCard = ({ movie }) => {

    const handleMouseOut = (e) => {
        // Some code here ...
    };

    const handleMouseOver = (e) => {
        // Some code here ...
    };

    const handleMouseClick = () => {
        if(!movie?.imdbID) {
            return;
        }
        const IMDB_URL = `https://www.imdb.com/title/${movie.imdbID}/?ref_=ttls_li_tt`;
        window.open(IMDB_URL, '_blank', 'noreferrer');
    }

    return (
        <div className='movie' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={handleMouseClick}>
            <div>
            </div>

            <div>
                <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}
                    alt={movie.Title}
                />
            </div>

            <div>
                <span>{movie.Type} </span><span className="year">({movie.Year})</span>
                <h3>{movie.Title}</h3>
            </div>
        </div>
    )
}

export default MovieCard;