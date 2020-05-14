import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import axios from "axios";

const initialMovie = {
    id: "",
    title: "",
    director: "",
    metascore: 0,
    stars: [],
};

const AddMovie = () => {
    const [movie, setMovie] = useState(initialMovie);
    const [starsState, setStarsState] = useState();

    const changeHandler = (ev) => {
        ev.persist();
        let value = ev.target.value;
        setMovie({
            ...movie,
            [ev.target.name]: value,
        });
    };

    const selectChangeHandler = (newValue, actionMeta) => {
        setStarsState(newValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // make a PUT request to edit the item
        for (let value of Object.values(starsState)) {
            movie.stars.push(value.label);
        }

        axios
            .post(`http://localhost:5000/api/movies/`, movie)
            .then((res) => {
                window.location.replace("/");
            })
            .catch((err) => console.log("Error is: ", err));
    };

    return (
        <div>
            <h2>Add New Movie</h2>
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

                <button className="btn btn-info">Add New movie</button>
            </form>
            <div class="pre-infos">
                <pre className="pre">{JSON.stringify(movie, null, 2)}</pre>
            </div>
        </div>
    );
};

export default AddMovie;
