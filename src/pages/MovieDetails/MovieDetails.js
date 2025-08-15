import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { movies } from '../../data/movies';
import styles from './MovieDetails.module.css';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the movie by ID
  const movie = movies.find(m => m.id === parseInt(id));

  // If movie not found, show error message
  if (!movie) {
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>
          <h2>Movie Not Found</h2>
          <p>Sorry, we couldn't find the movie you're looking for.</p>
          <Link to="/" className={styles.backButton}>
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.navigation}>
        <button 
          onClick={() => navigate(-1)} 
          className={styles.backButton}
        >
          ← Back
        </button>
        <Link to="/" className={styles.homeButton}>
          🎬 MovieScope
        </Link>
        <div className={styles.navLinks}>
          <Link to="/movies" className={styles.moviesButton}>
            All Movies
          </Link>
          <Link to="/about" className={styles.aboutButton}>
            About
          </Link>
        </div>
      </nav>

      {/* Movie Details */}
      <div className={styles.movieDetails}>
        <div className={styles.posterSection}>
          <img 
            src={movie.poster} 
            alt={`${movie.title} poster`}
            className={styles.poster}
          />
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.title}>{movie.title}</h1>
          
          <div className={styles.metadata}>
            <span className={styles.year}>{movie.year}</span>
            <span className={styles.duration}>{movie.duration}</span>
            <span className={styles.genre}>{movie.genre}</span>
          </div>

          <div className={styles.rating}>
            <span className={styles.ratingLabel}>Rating:</span>
            <span className={styles.ratingValue}>⭐ {movie.rating}/10</span>
          </div>

          <div className={styles.director}>
            <strong>Director:</strong> {movie.director}
          </div>

          <div className={styles.description}>
            <h3>Overview</h3>
            <p>{movie.description}</p>
          </div>

          {movie.cast && movie.cast.length > 0 && (
            <div className={styles.cast}>
              <h3>Cast</h3>
              <div className={styles.castList}>
                {movie.cast.map((actor, index) => (
                  <span key={index} className={styles.castMember}>
                    {actor}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;