import { useEffect } from 'react';

const API_URL = 'http://www.omdbapi.com?apikey=ea6cf8b3'

const App = () => {

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        console.log(data.Search);
    }

    useEffect(() => {
        searchMovies('Spiderman');
    }, []);

    return (
        <h1>App</h1>
    );
}

export default App;