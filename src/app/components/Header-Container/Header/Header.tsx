'use client';

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {Button, Menu, MenuItem} from "@mui/material";

import {Routes} from "@/app/utils/routes";
import {Loader} from "../../common/loader";
import {useGenres} from "@/app/hooks/use-genres/useGenres";
import styles from "./Header.module.css";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {genres, loading, error} = useGenres();
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAllGenresClick = () => {
    handleMenuClose();
    router.push(Routes.MOVIES);
  };

  const handleGenreClick = (genreId: number) => {
    handleMenuClose();
    router.push(`/genre/${genreId}`);
  };

  return (
    <header className={styles.header}>
      <Link href={Routes.HOME} className={styles.title}>
        My app
      </Link>
      <nav>
        <Link href={Routes.HOME} className={styles.link}>
          <Button color="inherit">Home</Button>
        </Link>
        <span>
          <Button
            color="inherit"
            onMouseEnter={handleMenuOpen}
            aria-controls={open ? "genre-menu" : undefined}
            aria-haspopup="true"
          >
            Movies
          </Button>
          <Menu
            id="genre-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            onMouseLeave={handleMenuClose}
          >
            <MenuItem onClick={handleAllGenresClick}>All Genres</MenuItem>
            {loading && <Loader/>}
            {error && <MenuItem>Error loading genres</MenuItem>}
            {genres.map((genre) => (
              <MenuItem key={genre.id} onClick={() => handleGenreClick(genre.id)}>
                {genre.name} {genre.movieCount !== undefined ? `(${genre.movieCount})` : <Loader/>}
              </MenuItem>
            ))}
          </Menu>
        </span>
      </nav>
    </header>
  );
};

export {Header};
