import React from "react";
// import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList(props) {
    return (
        <div className="movie-list">
            {props.movies.map((movie) => (
                //   <Link key={movie.id} to={`/movies/${movie.id}`}>
                //     <MovieCard movie={movie} />
                //   </Link>
                <div className="movie" key={movie.id}>
                    <MovieCard {...props} movie={movie} />
                </div>
            ))}
        </div>
    );
}

export default MovieList;
