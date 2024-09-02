import { useEffect, useState } from "react";
import SearchIcon from './search.svg';
import './App.css';
import MovieCard from "./MovieCard";

const API_URL = 'https://www.omdbapi.com?apikey=6c44d18b';

export default function App() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [debounceTimeout, setDebounceTimeout] = useState(null); // For debouncing

    const searchMovies = async (title) => {
    try {
        const response = await fetch(`${API_URL}&s=${title}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Check if the response contains the "Search" property
        if (data.Search) {
            setMovies(data.Search);
            console.log(data.Search);
        } else {
            setMovies([]); // Set an empty array if no movies are found
        }
    } catch (error) {
        console.error("Failed to fetch movies:", error);
    }
};


    useEffect(() => {
       
        searchMovies('Spiderman');
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);

        // Clear the previous timeout
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        // Set a new timeout
        const newTimeout = setTimeout(() => {
            searchMovies(e.target.value);
        }, 300); // 300 ms debounce

        setDebounceTimeout(newTimeout);
    };

    return (
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input
                    placeholder="Search for a movie"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    aria-label="Search for movies"
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                    style={{ cursor: 'pointer' }}
                />
            </div>
            {
                movies?.length > 0 ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard key={movie.imdbID} movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h1>No movies found</h1>
                    </div>
                )
            }
        </div>
    );
}
