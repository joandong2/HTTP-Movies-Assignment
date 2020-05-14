import React from "react";
// import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList(props) {
    return (
        <div className="movie-list">
            <div className="row row-eq-height">
                {props.movies.map((movie) => (
                    //   <Link key={movie.id} to={`/movies/${movie.id}`}>
                    //     <MovieCard movie={movie} />
                    //   </Link>
                    <div className="movie col-sm-4" key={movie.id}>
                        <MovieCard {...props} movie={movie} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieList;
