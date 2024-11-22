"use client";

import styles from './Header.module.css';
import Link from "next/link";
import {Routes} from "@/app/utils/routes";
import {Button} from "@mui/material";


const Header = () => {
  return (
    <header className={styles.header}>
      <Link href={Routes.HOME} className={styles.title}>
        My app
      </Link>
      <nav>
        <Link href={Routes.HOME} className={styles.link}>
          <Button color="inherit">Home</Button>
        </Link>
        <Link href={Routes.MOVIES} className={styles.link}>
          <Button color="inherit">Movies</Button>
        </Link>
        <Link href={Routes.GENRES} className={styles.link}>
          <Button color="inherit">Genres</Button>
        </Link>
      </nav>
    </header>
  );
};

export {Header};