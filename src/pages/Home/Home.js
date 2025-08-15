import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { movies } from '../../data/movies';
import './Home.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [showAllMovies, setShowAllMovies] = useState(false);

  // Get unique genres for filter dropdown
  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(movies.map(movie => movie.genre))];
    return uniqueGenres.sort();
  }, []);

  // Filter movies based on search term and genre
  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           movie.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGenre = selectedGenre === '' || movie.genre === selectedGenre;
      
      return matchesSearch && matchesGenre;
    });
  }, [searchTerm, selectedGenre]);

  // Get movies to display (6 for featured, all for show more section)
  const featuredMovies = filteredMovies.slice(0, 6);
  const hasMoreMovies = filteredMovies.length > 6;

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('');
  };


  const handleShowLess = () => {
    setShowAllMovies(false);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>🎬 MovieScope</h1>
        <p>Discover amazing films and read reviews</p>
        <nav>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/movies" className="nav-link">All Movies</Link>
        </nav>
      </header>

      {/* Search Section */}
      <section className="search-section">
        <div className="search-container">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search movies by title, director, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            
          </div>
          
          <div className="filter-wrapper">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="genre-filter"
            >
              <option value="">All Genres</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            
            {(searchTerm || selectedGenre) && (
              <button onClick={handleClearFilters} className="clear-filters">
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Info */}
        <div className="results-info">
          {searchTerm || selectedGenre ? (
            <p>
              Found {filteredMovies.length} movie{filteredMovies.length !== 1 ? 's' : ''}
              {searchTerm && ` matching "${searchTerm}"`}
              {selectedGenre && ` in ${selectedGenre}`}
            </p>
          ) : (
            <p>
              {showAllMovies ? `Showing all ${movies.length} movies` : `Featured Movies (${featuredMovies.length} of ${movies.length})`}
            </p>
          )}
        </div>
      </section>

      <main className="home-main">
        {/* Featured Movies Section */}
        {!showAllMovies && (
          <section className="featured-section">
            <h2 className="section-title">🌟 Featured Movies</h2>
            {featuredMovies && featuredMovies.length > 0 ? (
              <>
                <div className="movies-grid">
                  {featuredMovies.map(movie => (
                    <Link 
                      to={`/movie/${movie.id}`} 
                      key={movie.id} 
                      className="movie-card-link"
                    >
                      <div className="movie-card">
                        <img 
                          src={movie.poster} 
                          alt={`${movie.title} poster`}
                          className="movie-poster"
                        />
                        <div className="movie-info">
                          <h3 className="movie-title">{movie.title}</h3>
                          <div className="movie-details">
                            <span className="movie-year">{movie.year}</span>
                            <span className="movie-rating">⭐ {movie.rating}/10</span>
                          </div>
                          <p className="movie-genre">{movie.genre}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                
                {hasMoreMovies && (
                  <div className="show-more-section">
                    
                    <Link to="/movies" className="view-all-btn">
                      <span>View All Movies</span>
                      <span className="view-all-icon">→</span>
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <div className="no-movies">
                <h2>No featured movies found</h2>
                {searchTerm || selectedGenre ? (
                  <div>
                    <p>No movies match your search criteria.</p>
                    <button onClick={handleClearFilters} className="clear-filters-btn">
                      Show All Movies
                    </button>
                  </div>
                ) : (
                  <p>Check back later for new releases!</p>
                )}
              </div>
            )}
          </section>
        )}

        {/* All Movies Section */}
        {showAllMovies && (
          <section className="all-movies-section">
            <div className="section-header">
              <h2 className="section-title">🎬 All Movies</h2>
              <button onClick={handleShowLess} className="show-less-btn">
                ↑ Show Less
              </button>
            </div>
            
            {filteredMovies && filteredMovies.length > 0 ? (
              <div className="movies-grid">
                {filteredMovies.map(movie => (
                  <Link 
                    to={`/movie/${movie.id}`} 
                    key={movie.id} 
                    className="movie-card-link"
                  >
                    <div className="movie-card">
                      <img 
                        src={movie.poster} 
                        alt={`${movie.title} poster`}
                        className="movie-poster"
                      />
                      <div className="movie-info">
                        <h3 className="movie-title">{movie.title}</h3>
                        <div className="movie-details">
                          <span className="movie-year">{movie.year}</span>
                          <span className="movie-rating">⭐ {movie.rating}/10</span>
                        </div>
                        <p className="movie-genre">{movie.genre}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="no-movies">
                <h2>No movies found</h2>
                {searchTerm || selectedGenre ? (
                  <div>
                    <p>No movies match your search criteria.</p>
                    <button onClick={handleClearFilters} className="clear-filters-btn">
                      Show All Movies
                    </button>
                  </div>
                ) : (
                  <p>Check back later for new releases!</p>
                )}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default Home;