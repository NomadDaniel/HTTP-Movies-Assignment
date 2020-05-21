import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";

import UpdateForm from "./Movies/UpdateForm";

import Movie from "./Movies/Movie";
import axios from 'axios';

const App = () => {
  const [ savedList, setSavedList ] = useState( [] );
  const [ movieList, setMovieList ] = useState( [] );

  const getMovieList = () => {
    axios
      .get( "http://localhost:5000/api/movies" )
      .then( res => setMovieList( res.data ) )
      .catch( err => console.log( err.response ) );
  };

  const addToSavedList = movie => {
    setSavedList( [ ...savedList, movie ] );
  };

  const removeSavedMovie = movieId => {
    setSavedList( savedList.filter( m => m.id !== movieId ) );
  };
  const removeMovieById = movieId => {
    setMovieList( movieList.filter( m => m.id !== movieId ) );
  };

  const setMovie = movie => {
    const newMovieList = [ ...movieList ];
    const index = newMovieList.findIndex( m => m.id === movie.id );
    newMovieList[ index ] = movie;
    setMovieList( newMovieList );
  };

  useEffect( () => {
    getMovieList();
  }, [] );


  return (
    <>
      <SavedList list={ savedList } />

      <Route exact path="/movies" >
        <MovieList movies={ movieList } />
      </Route>

      {/* add a route at the path /update-movie/:id */ }
      {/* <Route exact path="/update-movies/:id">
        <Movie addToSavedList={ addToSavedList } />
      </Route> */}
      <Route exact path="/movies/:id"
        render={ props => <Movie { ...props } addToSavedList={ addToSavedList } removeMovieById={ removeMovieById } removeSavedMovie={ removeSavedMovie } /> } />

      <Route exact path="/update-movie/:id"
        render={ props => <UpdateForm { ...props } movies={ movieList } setMovie={ setMovie } /> } />
    </>
  );
};

export default App;
