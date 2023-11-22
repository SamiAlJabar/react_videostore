import React from 'react';

const MovieCard = ({ movie }) => {

    const handleMouseOut = () => {
        // document.body.style.backgroundColor = "#212426 !important";
        // document.body.style.backgroundImage = "url()";
    };

    const handleMouseOver = () => {
        // document.body.style.backgroundImage = "url("+movie.Poster+")";
        // document.body.style.backgroundRepeat = "no-repeat";
        // document.body.style.backgroundSize = "100%";
    };

    return (
        <div className="movie" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <div>
                <p>{movie.Year}</p>
            </div>

            <div>
                <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}
                    alt={movie.Title}
                />
            </div>

            <div>
                <span>{movie.Type}</span>
                <h3>{movie.Title}</h3>
            </div>
        </div>
    )
}

export default MovieCard;