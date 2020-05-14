import React from "react";
import { NavLink, Link } from "react-router-dom";

function SavedList({ list }) {
    return (
        <div className="row">
            <div className="col-md-12">
                <h1 className="title-heading">HTTP-Movies-Assignment</h1>
                <div className="navigation">
                    <div className="home-button">
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/add-movie">Add Movie</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-md-12">
                <div className="saved-list">
                    <p>Saved Movies:</p>
                    <ul>
                        {list.map((movie) => {
                            return (
                                <li key={movie.id}>
                                    <NavLink
                                        to={`/movies/${movie.id}`}
                                        key={movie.id}
                                        activeClassName="saved-active"
                                    >
                                        {movie.title}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SavedList;
