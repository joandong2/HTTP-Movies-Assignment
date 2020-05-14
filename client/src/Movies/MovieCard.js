import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MovieCard = (props) => {
    const saveMovie = (e) => {
        let id = e.target.getAttribute("data-id");
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => {
                props.addToSavedList(res.data);
            })
            .catch((err) => console.log(err.response));
    };

    const deleteMovie = (e) => {
        let id = e.target.getAttribute("data-id");
        //addToSavedList(movie);
        axios
            .delete(`http://localhost:5000/api/movies/${id}`)
            .then((res) => {
                window.location.replace("/");
            })
            .catch((err) => console.log(err.response));
    };

    const { id, title, director, metascore, stars } = props.movie;
    return (
        <div className="movie-card">
            <p className="movie-title">
                <Link key={id} to={`/movies/${id}`}>
                    {title}
                </Link>
            </p>

            <div className="movie-director">
                <b>
                    <em>{director}</em>
                </b>
            </div>
            <div className="movie-metascore">
                Metascore: <strong>{metascore}</strong>
            </div>
            <p>Actors</p>
            <ul className="actors-list">
                {stars.map((star) => (
                    <li key={star}>{star}</li>
                ))}
            </ul>
            <div className="button-wrapper">
                <button
                    data-id={id}
                    onClick={saveMovie}
                    className="btn btn-info btn-sm"
                >
                    Save
                </button>
                <button
                    onClick={() => props.history.push(`/update-movie/${id}`)}
                    className="btn btn-info btn-sm"
                >
                    Edit
                </button>
                <button
                    data-id={id}
                    onClick={deleteMovie}
                    className="btn btn-danger btn-sm"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default MovieCard;
