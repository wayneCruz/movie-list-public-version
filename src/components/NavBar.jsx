import { Link } from "react-router-dom";
import "../css/Navbar.css";
import brandIcon from "/movie.png"

function NavBar() {
  return <nav className="navbar">
    <div className="navbar-brand">
      <Link className="brand-link" to="/movie-list">
        <img className="movie-brand-icon" src={brandIcon}/>
          Movie List
      </Link>
      <p>Find an ongoing, previous, and upcoming movies!</p>
    </div>
    <div className="navbar-link">
      <Link to="/movie-list" className="nav-link">Home</Link>
      <Link to="/movie-list/favorites" className="nav-link">Favorites</Link>
    </div>
  </nav>
}

export default NavBar