import React from 'react';
import Link from "next/link";
import {Button} from '@mui/material';

import {Routes} from "@/app/utils/routes";
import styles from './About.module.css';

const About = () => {
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
      </section>
      <footer className={styles.footer}>
        <Link href={Routes.MOVIES}>
          <Button color="primary" variant="contained">Start Searching Movies</Button>
        </Link>
      </footer>
    </div>
  );
};

export {About};
