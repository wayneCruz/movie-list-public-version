import MovieCard from "../components/MovieCard.jsx";
import {useState, useEffect, useRef} from "react";
import { searchMovies, getPopularMovies} from "../services/api.js";
import "../css/Home.css";
import LoadingAnimation from "../components/Loading.jsx"
import searchIcon from "../assets/search.svg"

function Home() {
  //state values
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [movieHeader, setMovieHeader] = useState("Popular Movies Now");
  const [recommended, setRecommended] = useState([])
  const searchInputRef = useRef();

  //useEffect
  useEffect(() => {
    const loadPopularMovies = async () => {
      try{
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);

      }catch (error) {
        console.log(error);
        setError("Failed to load movies...");
      }
      finally {
        setLoading(false)
      }
    }

    loadPopularMovies();
  }, []);

  //submit what is on searchQuery to search movie
  const handleSearch = async (e) => {
    e.preventDefault();
    if(!searchQuery.trim()) {
      return
    }

    if(loading) {
      return 
    }
    
    setLoading(true)

    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setMovieHeader(`Search results for: "${searchQuery}"`)
      setRecommended([])
      setError(null);
    } catch(error) {
      console.log(error);
      setError("Failed to search movies...")
    } finally {
      setLoading(false)
    }
  }

  //show recommend moves while typing
  async function typingHandler(e) {
    setSearchQuery(e.target.value)
    
    try {
      const searchResults = await searchMovies(searchQuery);
      setRecommended(searchResults)
    } catch(error) {
      console.log(error);
    }
  }

  //search using the recommended movies shown below search
  async function clickRecommend(title) {
    try {
      const searchResults = await searchMovies(title);
      setMovies(searchResults);
      setMovieHeader(`Search results for: "${title}"`)
      setRecommended([])
      setSearchQuery(title)
      setError(null);
    } catch(error) {
      console.log(error);
      setError("Failed to search movies...")
    } finally {
      setLoading(false)
    }
  }

  return <div className="home">
    <form onSubmit={handleSearch} className="search-form">
      <input type="text" 
        placeholder="Search for movies..." 
        className="search-input"
        value={searchQuery}
        onChange={(e) => typingHandler(e)}
        ref={searchInputRef}
      />
      <button type="submit" className="search-button">Search</button>
    
      {recommended.length && searchQuery.length ? <div className="recommended-container">
        {recommended.map(rec => 
          rec.title.toLowerCase().startsWith(searchQuery) &&
          <li onClick={()=>clickRecommend(rec.title)} 
            key={rec.id}><img src={searchIcon}/>
              {rec.title}
          </li>
        )}
      </div>: null}
    </form>

    {movies.length && !error ? <h2 className="movie-result-header">{movieHeader}</h2> : null}
    
    {!movies.length && !error && !loading && searchMovies.length ? <h2 className="search-no-result">No movies found!</h2>: null}

    {error && <div className="error-message">
      <h2>{error}</h2>
      <p>Please check your internet connection.</p>
    </div>}

    {loading && <LoadingAnimation />} 
    
    {!error && !loading && <div className="movies-grid">
      {movies.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </div>}
  </div>
}

export default Home