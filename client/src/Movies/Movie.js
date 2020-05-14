import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
    console.log(props);

    const [movie, setMovie] = useState(null);
    const params = useParams();

    const fetchMovie = (id) => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => setMovie(res.data))
            .catch((err) => console.log(err.response));
    };
    // const saveMovie = () => {
    //     props.addToSavedList(movie);
    // };

    useEffect(() => {
        fetchMovie(params.id);
    }, [params.id]);

    if (!movie) {
        return <div>Loading movie information...</div>;
    }

    return (
        <div className="save-wrapper">
            <MovieCard {...props} movie={movie} />
        </div>
    );
}

export default Movie;
