import React from 'react';
import Link from "next/link";
import {Button} from '@mui/material';

import {Routes} from "@/app/utils/routes";
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.homePage}>
      <header className={styles.header}>
        <h1>The Movies App</h1>
        <p>Your ultimate movie search app</p>
      </header>

      <section className={styles.description}>
        <h2>Welcome to The Movies App!</h2>
        <p>This is an application where you can search and discover your favorite movies with details like ratings,
          genres, and descriptions. The app integrates with the <a href="https://www.themoviedb.org/documentation/api"
                                                                   target="_blank" rel="noopener noreferrer">Movies
            Database API</a> to provide rich movie data. Simply register with the API, and you can start searching for
          movies instantly!</p>

        <h3>Features of The Movies App:</h3>
        <ul>
          <li>Browse movies by genres and discover new ones.</li>
          <li>Get detailed information about each movie including plot, ratings, and more.</li>
          <li>Rate movies with star ratings.</li>
          <li>Explore movies posters and other media.</li>
          <li>Navigate through pagination to explore movies across multiple pages.</li>
          <li>Search movies by name or partial name.</li>
          <li>Get details of each movie on a separate page by clicking on a movie card.</li>
        </ul>

        <h3>API Integration:</h3>
        <p>The app uses the <a href="https://developers.themoviedb.org/3/discover/movie-discover" target="_blank"
                               rel="noopener noreferrer">Movies Database API</a> for fetching movie data. Here is how to
          get started:</p>
        <ul>
          <li>Register on the Movies Database website to get your <a href="https://www.themoviedb.org/documentation/api"
                                                                     target="_blank" rel="noopener noreferrer">API key
            and token</a>.
          </li>
          <li>Use the API to discover movies and get data based on various parameters such as genre, rating, etc.</li>
        </ul>

        <h3>Components and Structure:</h3>
        <p>The app consists of several key components that help display movies, their details, and their ratings:</p>
        <ul>
          <li><strong>Header:</strong> A navigation bar that allows users to navigate through the app.</li>
          <li><strong>MoviesList:</strong> Displays a list of movie cards with brief details.</li>
          <li><strong>MoviesListCard:</strong> Contains detailed information about each movie.</li>
          <li><strong>PosterPreview:</strong> Displays the movie poster image.</li>
          <li><strong>StarsRating:</strong> Component for displaying star ratings.</li>
          <li><strong>MovieInfo:</strong> Detailed information about each movie including description and badges for
            genres.
          </li>
          <li><strong>GenreBadge:</strong> Displays badges for each genre associated with the movie.</li>
          <li><strong>UserInfo:</strong> Shows basic user information (e.g., hardcoded profile circle).</li>
        </ul>

        <h3>Page Structure:</h3>
        <ul>
          <li><strong>MoviesPage:</strong> The main page displaying the list of movies and the search functionality.
          </li>
          <li><strong>Pagination:</strong> Navigate through pages of movies with pagination controls.</li>
          <li><strong>MovieDetailPage:</strong> A detailed page with more information on each movie when clicked.</li>
        </ul>

        <h3>Visual Components:</h3>
        <p>For the visual aspect, we have used various UI components like stars for ratings, badges for genres, and
          more. Some useful components you can explore:</p>
        <ul>
          <li>Star Ratings: <a href="https://codepen.io/benjaminreid/pen/vNVwPW" target="_blank"
                               rel="noopener noreferrer">CodePen Example</a></li>
          <li>React Star Ratings Package: <a href="https://www.npmjs.com/package/react-star-ratings" target="_blank"
                                             rel="noopener noreferrer">React Star Ratings</a></li>
          <li>Genre Badges: <a href="https://reactstrap.github.io/?path=/docs/components-badge--badge" target="_blank"
                               rel="noopener noreferrer">Reactstrap Badge</a></li>
        </ul>

        <h3>Mockup & Design Inspiration:</h3>
        <p>The overall concept and layout inspiration for this project comes from the following sources:</p>
        <ul>
          <li><a href="https://dribbble.com/shots/6461891-Media-store-idea-Movies" target="_blank"
                 rel="noopener noreferrer">Media Store Idea - Dribbble</a></li>
          <li><a href="https://dribbble.com/shots/6090855-Raymov-Website-streaming-movie" target="_blank"
                 rel="noopener noreferrer">Raymov Website - Dribbble</a></li>
          <li><a href="https://dribbble.com/search/movies%20web%20app" target="_blank" rel="noopener noreferrer">Movie
            Web App - Dribbble</a></li>
        </ul>

      </section>

      <footer className={styles.footer}>
        <Link href={Routes.MOVIES}>
          <Button color="primary" variant="contained">Start Searching Movies</Button>
        </Link>
      </footer>
    </div>
  );
};

export {Home};
