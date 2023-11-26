import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com/?apikey=' + process.env.REACT_APP_OMD_API_KEY;

const App = () => {
    
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [backupTerm, setBackupTerm] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const [totalResults, setTotalResults] = useState(0);

    const searchMovies = async (title, pageNumber=1) => {
        if(title && title.length > 0) {
            if (title != backupTerm) {
                pageNumber = 1;
            }
            setBackupTerm(title);
            setSearchTerm("");
        } else {
            title = backupTerm;
        }
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
        setSearchTerm('Home Alone');
        setPageNumber(1);
    }, []);

    useEffect(() => {
        searchMovies(searchTerm, pageNumber);
    }, [pageNumber]);

    // var hoverText = document.querySelector('.hover-text');

    // const handleMouseOut = (e) => {
        
    // };

    // const handleMouseOver = (e) => {
        
    // };

    return (
        <div className="app">
            <h1>Movie | Series | Game</h1>

            <div className="search">
                <input
                    placeholder="Search for movies, series, games ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key === 'Enter') {
                            if(pageNumber == 1) {
                                searchMovies(searchTerm);
                            } else {
                                setPageNumber(1);
                            }
                        }
                    }}
                />
                <img
                    src={SearchIcon}
                    alt="Search"
                    onClick={() => {
                        if(pageNumber == 1) {
                            searchMovies(searchTerm);
                        } else {
                            setPageNumber(1);
                        }
                    }}
                />
            </div>
            {
                movies?.length > 0
                ? (
                    <>
                        <div className="empty text-center">
                            <h2>Showing {((pageNumber-1) * 10) + '-' + (pageNumber * 10)} out of {totalResults} movies</h2>
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
                            onClick={() => setPageNumber(pageNumber > totalResults/10 ? pageNumber : pageNumber+1)}
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
                        <h2>No movie, series or game found for <u>'{backupTerm}'</u>!</h2>
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
                    className="glow"
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