import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import MovieCard from './MovieCard';

// deconstructed props
function Movie ( { addToSavedList, removeMovieById, history, removeSavedMovie } ) {
  const [ movie, setMovie ] = useState( null );
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get( `http://localhost:5000/api/movies/${ id }` )
      .then( res => setMovie( res.data ) )
      .catch( err => console.log( err.response ) );
  };
  const saveMovie = () => {
    addToSavedList( movie );
  };
  useEffect( () => {
    fetchMovie( match.params.id );
  }, [ match.params.id ] );
  if ( !movie ) {
    return <div>Loading movie information...</div>;
  }
  // ********** delete movie function ********** //
  const deleteMovie = e => {
    e.preventDefault();
    //axios delete request needs to call both "remove" functions from App


    axios.delete( `http://localhost:5000/api/movies/${ movie.id }` )
      .then( res => {

        removeMovieById( res.data );
        console.log( res.data );

        removeSavedMovie( res.data );
        history.push( '/movies' );
      } );
  };
  // ****************************************************** //

  const updateMovie = e => {
    history.push( `/update-movie/${ movie.id }` );
  };

  return (
    <div className='save-wrapper'>
      <MovieCard movie={ movie } />
      <div className='save-button' onClick={ saveMovie }>
        Save
      </div>
      <div className='delete-button' onClick={ deleteMovie } >
        Delete
      </div>
      <div className='update-button' onClick={ updateMovie } >
        Update
      </div>
    </div>
  );
}
export default Movie;