import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { movies } from '../../data/movies';
import styles from './AllMovies.module.css';

function AllMovies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  // Get unique genres for filter dropdown
  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(movies.map(movie => movie.genre))];
    return uniqueGenres.sort();
  }, []);

  // Filter and sort movies
  const filteredAndSortedMovies = useMemo(() => {
    let filtered = movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           movie.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGenre = selectedGenre === '' || movie.genre === selectedGenre;
      
      return matchesSearch && matchesGenre;
    });

    // Sort movies
    filtered.sort((a, b) => {
      let valueA, valueB;
      
      switch (sortBy) {
        case 'year':
          valueA = a.year;
          valueB = b.year;
          break;
        case 'rating':
          valueA = a.rating;
          valueB = b.rating;
          break;
        case 'title':
        default:
          valueA = a.title.toLowerCase();
          valueB = b.title.toLowerCase();
          break;
      }

      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, selectedGenre, sortBy, sortOrder]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('');
    setSortBy('title');
    setSortOrder('asc');
  };

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.navigation}>
        <Link to="/" className={styles.homeButton}>
          ← Back to Home
        </Link>
        <Link to="/" className={styles.logo}>
          🎬 MovieScope
        </Link>
       
      </nav>

      {/* Page Header */}
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>All Movies</h1>
        <p className={styles.pageSubtitle}>
          Explore our complete collection of {movies.length} amazing films
        </p>
      </header>

      {/* Search and Filter Section */}
      <section className={styles.filterSection}>
        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <input
              type="text"
              placeholder="Search movies by title, director, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <button className={styles.searchIcon}>🔍</button>
          </div>
          
          <div className={styles.filterControls}>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className={styles.genreFilter}
            >
              <option value="">All Genres</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>

            <div className={styles.sortControls}>
              <span className={styles.sortLabel}>Sort by:</span>
              <button 
                onClick={() => handleSortChange('title')}
                className={`${styles.sortButton} ${sortBy === 'title' ? styles.active : ''}`}
              >
                Title {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button 
                onClick={() => handleSortChange('year')}
                className={`${styles.sortButton} ${sortBy === 'year' ? styles.active : ''}`}
              >
                Year {sortBy === 'year' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button 
                onClick={() => handleSortChange('rating')}
                className={`${styles.sortButton} ${sortBy === 'rating' ? styles.active : ''}`}
              >
                Rating {sortBy === 'rating' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            </div>
            
            {(searchTerm || selectedGenre || sortBy !== 'title' || sortOrder !== 'asc') && (
              <button onClick={handleClearFilters} className={styles.clearFilters}>
                Reset All
              </button>
            )}
          </div>
        </div>

        {/* Results Info */}
        <div className={styles.resultsInfo}>
          <p>
            {searchTerm || selectedGenre ? (
              `Found ${filteredAndSortedMovies.length} movie${filteredAndSortedMovies.length !== 1 ? 's' : ''}`
            ) : (
              `Showing all ${filteredAndSortedMovies.length} movies`
            )}
            {selectedGenre && ` in ${selectedGenre}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>
      </section>

      {/* Movies Grid */}
      <main className={styles.moviesContainer}>
        {filteredAndSortedMovies.length > 0 ? (
          <div className={styles.moviesGrid}>
            {filteredAndSortedMovies.map((movie, index) => (
              <Link 
                to={`/movie/${movie.id}`} 
                key={movie.id} 
                className={styles.movieCardLink}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.movieCard}>
                  <div className={styles.movieImageContainer}>
                    <img 
                      src={movie.poster} 
                      alt={`${movie.title} poster`}
                      className={styles.moviePoster}
                    />
                    <div className={styles.movieOverlay}>
                      <span className={styles.viewDetails}>View Details</span>
                    </div>
                  </div>
                  <div className={styles.movieInfo}>
                    <h3 className={styles.movieTitle}>{movie.title}</h3>
                    <div className={styles.movieMeta}>
                      <span className={styles.movieYear}>{movie.year}</span>
                      <span className={styles.movieRating}>⭐ {movie.rating}/10</span>
                    </div>
                    <p className={styles.movieGenre}>{movie.genre}</p>
                    <p className={styles.movieDirector}>by {movie.director}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.noMovies}>
            <div className={styles.noMoviesIcon}>🎭</div>
            <h2>No movies found</h2>
            {searchTerm || selectedGenre ? (
              <div>
                <p>No movies match your current filters.</p>
                <button onClick={handleClearFilters} className={styles.clearFiltersBtn}>
                  Clear All Filters
                </button>
              </div>
            ) : (
              <p>Check back later for new releases!</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default AllMovies;