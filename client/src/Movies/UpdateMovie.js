import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import axios from "axios";

const initialMovie = {
    id: "",
    title: "",
    director: "",
    metascore: 0,
    stars: [],
};

const UpdateMovie = (props) => {
    const [movie, setMovie] = useState(initialMovie);
    const [starsState, setStarsState] = useState();

    useEffect(() => {
        const movieToUpdate = props.movies.find((movie) => {
            return `${movie.id}` === props.match.params.id;
        });

        if (movieToUpdate) {
            setMovie(movieToUpdate);
        }

        setStarsState(
            movie.stars.map((star) => {
                return {
                    label: star,
                    value: star.replace(/\s+/g, "-").toLowerCase(),
                };
            })
        );
    }, [props.movies, props.match.params.id, movie.stars]);

    const changeHandler = (ev) => {
        ev.persist();
        let value = ev.target.value;
        setMovie({
            ...movie,
            [ev.target.name]: value,
        });
    };

    const selectChangeHandler = (newValue, actionMeta) => {
        // console.group("Value Changed");
        // console.log(newValue);
        // console.log(`action: ${actionMeta.action}`);
        // console.groupEnd();
        setStarsState(newValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // make a PUT request to edit the item
        movie.stars = [];
        for (let value of Object.values(starsState)) {
            movie.stars.push(value.label);
        }

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
            <h2>Update Movie</h2>
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

                {movie.stars ? (
                    <CreatableSelect
                        isMulti
                        value={starsState}
                        onChange={selectChangeHandler}
                        options={movie.stars.map((star) => {
                            return {
                                label: star,
                                value: star.replace(/\s+/g, "-").toLowerCase(),
                            };
                        })}
                    />
                ) : (
                    <p>Loading..</p>
                )}

                <button className="md-button form-button">Update</button>
            </form>
        </div>
    );
};

export default UpdateMovie;
