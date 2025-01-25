import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
    const movies = useSelector((store) => store.movies);

    return (
      (movies.nowPlayingMovies && movies.popularMovies && 
       movies.trendingMovies && movies.upcomingMovies) && (
        <div className="bg-black">
          <div className="mt-0 md:-mt-39 pl-4 md:pl-12 relative z-20">
            <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
            <MovieList title={"Popular"} movies={movies.popularMovies} />
            <MovieList title={"Trending"} movies={movies.trendingMovies} />
            <MovieList
              title={"Upcoming Movies"}
              movies={movies.upcomingMovies}
            />
            <MovieList title={"Blockbuster Movies"} movies={movies.nowPlayingMovies} />
          </div>
        </div>
      )
    );
}

export default SecondaryContainer