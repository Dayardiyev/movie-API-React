import React, { useState, useEffect } from "react";
import noImage from "./img/no-image.png";

const IMG_API = "https://image.tmdb.org/t/p/original";

const API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=418969814078357800fcf2d3df514a26&with_original_language=en";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=418969814078357800fcf2d3df514a26&query=";

const setVoteColor = (vote) => {
  if (vote >= 7.5) {
    return "green";
  } else if (vote >= 6) {
    return "yellow";
  } else if (vote === 0) {
    return "none";
  } else {
    return "red";
  }
};

function genresToString(e) {
  switch (e) {
    case 28:
      return "Action";
    case 12:
      return "Adventure";
    case 16:
      return "Animation";
    case 35:
      return "Comedy";
    case 80:
      return "Crime";
    case 99:
      return "Documentary";
    case 18:
      return "Drama";
    case 10751:
      return "Family";
    case 14:
      return "Fantasy";
    case 36:
      return "History";
    case 27:
      return "Horror";
    case 10402:
      return "Music";
    case 9648:
      return "Mystery";
    case 10749:
      return "Romance";
    case 878:
      return "Science Fiction";
    case 10770:
      return "TV Movie";
    case 53:
      return "Thriller";
    case 10752:
      return "War";
    case 37:
      return "Western";
    case 10759:
      return "Action & Adventure";
    case 10762:
      return "Kids";
    case 10763:
      return "News";
    case 10764:
      return "Reality";
    case 10765:
      return "Sci-Fi & Fantasy";
    case 10766:
      return "Soap";
    case 10767:
      return "Talk";
    case 10768:
      return "War & Politics";
    default:
      return "";
  }
}

const MovieList = ({
  title,
  poster_path,
  release_date,
  overview,
  vote_average,
  genre_ids,
}) => {
  return (
    <>
      <div className="item">
        <div className="item-img">
          <img
            src={poster_path ? IMG_API + poster_path : noImage}
            alt={"Loading..."}
          />
        </div>
        <div className="item-text">
          <div className="title">{title}</div>
          <div className="item-info">
            <div className="subtitle">
              {release_date ? release_date.slice(0, 4) : ""}
            </div>
            <div className="rating">
              <div className={`num ${setVoteColor(vote_average)}`}>
                {vote_average}
              </div>
            </div>
          </div>
        </div>
        <div className="movie-over">
          <h2>Overview: </h2>
          <p className="grey-font">{overview}</p>
          {genre_ids ? (
            <p>
              <span className="bold">Genres:</span> <br />
              <em className="grey-font">
                {genre_ids
                  .map((genre) => {
                    return genresToString(genre);
                  })
                  .join(", ")}
              </em>
            </p>
          ) : (
            "No Genres"
          )}
        </div>
      </div>
    </>
  );
};

function Movie() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getMovies = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  };

  const searchMovies = (searchURL, url) => {
    fetch(searchURL + searchTerm)
      .then((res) => res.json())
      .then((data) => {
        if (searchTerm.length > 0) {
          setMovies(data.results);
        } else {
          getMovies(url);
        }
      });
  };

  useEffect(() => {
    getMovies(API);
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    searchMovies(SEARCH_API, API);
    setSearchTerm("");
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="search-wrapper">
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleOnChange}
          ></input>
          <button type="submit" className="search-img">
            <svg
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 124.524 124.524"
            >
              <g>
                <path
                  d="M51,102.05c10.5,0,20.2-3.2,28.3-8.6l29.3,29.3c2.301,2.3,6.101,2.3,8.5,0l5.7-5.7c2.3-2.3,2.3-6.1,0-8.5L93.4,79.35
		c5.399-8.1,8.6-17.8,8.6-28.3c0-28.1-22.9-51-51-51c-28.1,0-51,22.9-51,51C0,79.149,22.8,102.05,51,102.05z M51,20.05
		c17.1,0,31,13.9,31,31c0,17.1-13.9,31-31,31c-17.1,0-31-13.9-31-31C20,33.95,33.9,20.05,51,20.05z"
                />
              </g>
            </svg>
          </button>
        </form>
      </div>
      <div className="container">
        <div className="wrapper">
          {movies.map((movie) => {
            return <MovieList key={movie.id} {...movie} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Movie;
