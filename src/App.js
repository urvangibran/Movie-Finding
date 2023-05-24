import './App.css';
import { useEffect, useState } from 'react';
import { getMovieList, searchMovie } from "./api"

function App() {
  const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    getMovieList().then((res) => {
      setPopularMovies(res)
    });
  }, [])

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="wrapper" key={i}>
          <div className="title">{movie.title}</div>
          <img className='image' src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} />
          <div className="date">Release: {movie.release_date}</div>
          <div className="rate">{movie.vote_average} / 10</div>
        </div>
      )
    })
  }

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q)
      setPopularMovies(query.results)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='title-web'>Drug Movie Finding</h1>

        <input
          placeholder='Masukkan judul film'
          className='Movie-search'
          onChange={({ target }) => search(target.value)}
        />
        <div className="container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
}

export default App;
