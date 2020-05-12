import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
    id: "",
    title: "",
    director: "",
    metascore: 0,
};

const UpdateMovie = (props) => {
    //console.log(props.updateMovieList);
    const [movie, setMovie] = useState(initialMovie);
    //const [movies, setMovies] = useState(props.movies);

    useEffect(() => {
        const movieToUpdate = props.movies.find((movie) => {
            return `${movie.id}` === props.match.params.id;
        });

        if (movieToUpdate) {
            setMovie(movieToUpdate);
        }
    }, [props.movies, props.match.params.id]);

    const changeHandler = (ev) => {
        ev.persist();
        let value = ev.target.value;
        setMovie({
            ...movie,
            [ev.target.name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // make a PUT request to edit the item
        // axios
        //     .all([
        //         axios.put(
        //             `http://localhost:5000/api/movies/${movie.id}`,
        //             movie
        //         ),
        //         axios.get("http://localhost:5000/api/movies"),
        //     ])
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then((res) => {
                //console.log(res);
                window.location.replace("/");
            })
            .catch((err) => console.log("Error is: ", err));
    };

    return (
        <div>
            <h2>Update Item</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="Title"
                    value={movie.title}
                />
                <div className="baseline" />

                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="Director.."
                    value={movie.director}
                />
                <div className="baseline" />

                <input
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="Metascore.."
                    value={Number(movie.metascore)}
                />
                <div className="baseline" />

                <button className="md-button form-button">Update</button>
            </form>
        </div>
    );
};

export default UpdateMovie;
