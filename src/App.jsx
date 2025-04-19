import './css/App.css';
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx"
import {Routes, Route} from "react-router-dom";
import Navbar from "./components/NavBar.jsx";
import { MovieProvider } from './context/MovieContext.jsx';
import Footer from './components/Footer.jsx'

function App() {

  return (
    <MovieProvider>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/movie-list" element={<Home />}/>
          <Route path="/movie-list/favorites" element={<Favorites />}/>
        </Routes>
      </main>
      <Footer />
    </MovieProvider>

  )
}

export default App
