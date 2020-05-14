import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import AddMovie from "./Movies/AddMovie";
import UpdateMovie from "./Movies/UpdateMovie";
import axios from "axios";

const App = () => {
    const [savedList, setSavedList] = useState([]);
    const [movieList, setMovieList] = useState([]);

    const getMovieList = () => {
        axios
            .get("http://localhost:5000/api/movies")
            .then((res) => setMovieList(res.data))
            .catch((err) => console.log(err.response));
    };

    const addToSavedList = (movie) => {
        setSavedList([...savedList, movie]);
    };

    useEffect(() => {
        getMovieList();
    }, []);

    return (
        <div className="row">
            <div className="col-md-3">
                <SavedList list={savedList} />
            </div>
            <div className="col-md-9">
                <Route
                    exact
                    path="/"
                    render={(props) => (
                        <MovieList
                            {...props}
                            movies={movieList}
                            addToSavedList={addToSavedList}
                        />
                    )}
                />
                <Route
                    path="/movies/:id"
                    render={(props) => (
                        <Movie {...props} addToSavedList={addToSavedList} />
                    )}
                />
                <Route
                    path="/add-movie/"
                    render={(props) => <AddMovie {...props} />}
                />
                <Route
                    path="/update-movie/:id"
                    render={(props) => (
                        <UpdateMovie
                            {...props}
                            movies={movieList}
                            updateMovieList={setMovieList}
                        />
                    )}
                />
            </div>
        </div>
    );
};

export default App;
