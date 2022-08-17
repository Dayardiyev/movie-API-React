import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Movie from "./Components/Movie.jsx";
import TV from "./Components/TV.jsx";

function App() {
  return (
    <>
      <header>
        <div className="header-wrapper">
          <div className="header-links">
            <Link to="/">Movie</Link>
            <Link to="/tv">TV</Link>
          </div>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Movie />} />
        <Route path="/tv" element={<TV />} />
      </Routes>
    </>
  );
}

export default App;
