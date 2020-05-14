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
                window.location.replace("/");
            })
            .catch((err) => console.log("Error is: ", err));
    };

    return (
        <div>
            <h2>Update Movie #{movie.id}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        name="title"
                        onChange={changeHandler}
                        placeholder="Title"
                        value={movie.title}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="director">Director: </label>
                    <input
                        type="text"
                        name="director"
                        onChange={changeHandler}
                        placeholder="Director.."
                        value={movie.director}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="metascore">Metascore: </label>
                    <input
                        type="number"
                        name="metascore"
                        onChange={changeHandler}
                        placeholder="Metascore.."
                        value={Number(movie.metascore)}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="actors">Actors: </label>
                    {movie.stars ? (
                        <CreatableSelect
                            isMulti
                            value={starsState}
                            onChange={selectChangeHandler}
                            options={movie.stars.map((star) => {
                                return {
                                    label: star,
                                    value: star
                                        .replace(/\s+/g, "-")
                                        .toLowerCase(),
                                };
                            })}
                        />
                    ) : (
                        <p>Loading..</p>
                    )}
                </div>

                <button className="btn btn-info">Update</button>
            </form>
            <div class="pre-infos">
                <pre className="pre">{JSON.stringify(movie, null, 2)}</pre>
            </div>
        </div>
    );
};

export default UpdateMovie;
