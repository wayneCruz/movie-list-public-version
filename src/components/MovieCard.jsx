import "../css/MovieCard.css";
import { useMovieContext } from "../context/MovieContext.jsx";

function MovieCard({movie}) {
  const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext();
  const favorite = isFavorite(movie.id);

  const genreArray = [
    {genre: "Action",          
      id: 28},
    {genre: "Adventure",       
      id: 12},
    {genre: "Animation",      
      id: 16},
    {genre: "Comedy",          
      id: 35},
    {genre: "Crime",          
      id: 80},
    {genre: "Documentary",     
      id: 99},
    {genre: "Drama",           
      id: 18},
    {genre: "Family",          
      id: 10751},
    {genre: "Fantasy",         
      id: 14},
    {genre: "History",        
      id: 36},
    {genre: "Horror",          
      id: 27},
    {genre: "Music",           
      id: 10402},
    {genre: "Mystery",         
      id: 9648},
    {genre: "Romance",         
      id: 10749},
    {genre: "Science Fiction", 
      id: 878},
    {genre: "TV Movie",        
      id: 10770},
    {genre: "Thriller",        
      id: 53},
    {genre: "War",             
      id: 10752},
    {genre: "Western",         
      id: 37},
  ]

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(movie.id)
    }
    else {
      addToFavorites(movie)
    }
  }

  return <div className="movie-card">
          <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <div className="movie-overlay">
              <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                ♥
              </button>
            </div>
          </div>
          <div className="movie-info">
            <h3>{movie.title}</h3>
            <p><strong>Released Date:</strong> {movie.release_date}</p>
            <p><strong>Genres: </strong>
              {movie.genre_ids.map((genreId, index) => {
                return genreArray.map(gen => {
                  if(genreId === gen.id && index + 1 !== movie.genre_ids.length) {
                    return `${gen.genre}, `
                  }else if(genreId === gen.id) {
                    return gen.genre
                  }
                })
              })}
            </p>
            <p><strong>Overview:</strong> {movie.overview}</p>

            <div className="ratings-container">
              <p><strong>Ratings: </strong></p>
              <div>
                <p>{`Average: ${(movie.vote_average * 10).toFixed(2)}%`}</p> 
                <p>{`Count: ${movie.vote_count}`}</p>
              </div>
            </div>
          </div>
        </div>
}

export default MovieCard