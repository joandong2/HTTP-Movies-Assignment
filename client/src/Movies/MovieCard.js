import React from "react";

const MovieCard = (props) => {
    const { id, title, director, metascore, stars } = props.movie;
    return (
        <div className="movie-card">
            <h2>{title}</h2>
            <div className="movie-director">
                Director: <em>{director}</em>
            </div>
            <div className="movie-metascore">
                Metascore: <strong>{metascore}</strong>
            </div>
            <h3>Actors</h3>

            {stars.map((star) => (
                <div key={star} className="movie-star">
                    {star}
                </div>
            ))}
            <button
                onClick={() => props.history.push(`/update-movie/${id}`)}
                className="md-button"
            >
                Edit
            </button>
            {/* <button onClick={deleteItem} className="md-button">
                Delete
            </button> */}
        </div>
    );
};

export default MovieCard;
