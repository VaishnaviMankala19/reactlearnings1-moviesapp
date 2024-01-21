import {useEffect, useState} from "react";
import  SearchIcon from './search.svg';
import './App.css';
import MovieCard from "./MovieCard";

const API_URL = 'http://www.omdbapi.com?apikey=6c44d18b'

export default function App(){
    const [movies ,setMovies] = useState([]);
    const [searchTerm , setSearchTerm] = useState('')

    const searchMovies = async(title)=>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }
    
    useEffect(()=>{
        searchMovies('Superman');
    },[]);

    return(
        <div className="app">
            <h1>MovieLand</h1>
        <div className="search">
            <input 
            placeholder="search a movie"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            />
            <img 
            src={SearchIcon}
            alt="search"
            onClick={()=>searchMovies(searchTerm)}
            />
        </div>
        {
            movies?.length>0
            ?(
                <div className="container">
                {movies.map((movie)=>(
                    <MovieCard movie={movie}/>
                ))}
                </div>
            ):(
                <div className="empty">
                    <h1>No movies found</h1>
                </div>
            
            )
        }
        </div>
    )
}