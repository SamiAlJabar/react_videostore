import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com/?apikey=ea6cf8b3';

const App = () => {
    
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const searchMovies = async (title, pageNumber) => {
        try {
            const response = await fetch(`${API_URL}&s=${title}&page=${pageNumber}`);
            const data = await response.json();
            if(data?.Search?.length > 0) {
                setMovies(data.Search);
                setTotalResults(data.totalResults);
            } else {
                setMovies(null);
                setTotalResults(0);
                if(pageNumber > 1) {
                    setPageNumber(pageNumber-1);
                }
            }
            
        } catch (error) {
            console.log("catch error: ", error);
        }
        
    }

    useEffect(() => {
        searchMovies(searchTerm, pageNumber);
    }, [pageNumber]);

    return (
        <div className="app">
            <h1>Movie | Series | Game</h1>

            <div className="search">
                <input
                    placeholder="Search for movies, series, games ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="Search"
                    onClick={() => {
                        setPageNumber(1);
                        searchMovies(searchTerm);
                    }}
                />
            </div>
            {
                movies?.length > 0
                ? (
                    <>
                        <div className="empty">
                            <h2>Showing {((pageNumber-1) * 10) + '-' + (pageNumber * 10)} out of {totalResults} movies found!</h2>
                        </div>
                        <div className="container">
                        <button
                            type="button"
                            onClick={() => setPageNumber(1)}
                        >FIRST</button>
                        <button
                            type="button"
                            onClick={() => setPageNumber(pageNumber < 2 ? pageNumber : pageNumber-1)}
                        >PREV</button>
                        <p className="page-number">{pageNumber}</p>
                        <button
                            type="button"
                            onClick={() => setPageNumber(pageNumber > 100 ? pageNumber : pageNumber+1)}
                        >NEXT</button>
                        <button
                            type="button"
                            onClick={() => setPageNumber((totalResults/10 < 1) ? 1 : Math.ceil(totalResults/10))}
                        >LAST</button>
                        </div>
                        <div className="container">
                            {
                                movies.map((movie) => (
                                    <MovieCard movie={movie} />
                                ))
                            }
                        </div>
                    </>
                )
                : (
                    <div className="empty">
                        <h2>No movie, series or game found!</h2>
                    </div>
                )
            }
            <div className="container">
                <button
                    type="button"
                    onClick={() => setPageNumber(1)}
                >FIRST</button>
                <button
                    type="button"
                    onClick={() => setPageNumber(pageNumber < 2 ? pageNumber : pageNumber-1)}
                >PREV</button>
                <p className="page-number">{pageNumber}</p>
                <button
                    type="button"
                    onClick={() => setPageNumber(pageNumber > 100 ? pageNumber : pageNumber+1)}
                >NEXT</button>
                <button
                    type="button"
                    onClick={() => setPageNumber((totalResults/10 < 1) ? 1 : Math.ceil(totalResults/10))}
                >LAST</button>
            </div>
        </div>
    );
}

export default App;