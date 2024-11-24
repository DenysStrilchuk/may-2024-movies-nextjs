'use client';

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {Button, Menu, MenuItem, TextField} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Іконка користувача з Material UI

import {Routes} from "@/app/utils/routes";
import {Loader} from "../../common/loader";
import {useGenres} from "@/app/hooks/use-genres/useGenres";
import styles from "./Header.module.css";
import ThemeToggle from "@/app/components/common/theme-toogle/ThemeToggle";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
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
    router.push(`${Routes.GENRE}/${genreId}`);
  };

  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim() === "") return;
    router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className={styles.header}>
      <Link href={Routes.MOVIES} className={styles.title}>
        My app
      </Link>
      <nav>
        <Link href={Routes.ABOUT} className={styles.link}>
          <Button color="inherit">About</Button>
        </Link>
        <span>
          <Button
            color="inherit"
            onClick={handleMenuOpen}
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
      <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search movies..."
          variant="outlined"
          size="small"
          className={styles.searchInput}
        />
        <Button type="submit" variant="contained" color="primary" size="large">
          Search
        </Button>
      </form>
      <div className={styles.userProfile}>
        <AccountCircleIcon className={styles.userIcon} />
        <span className={styles.userName}>Denys Strilchuk</span>
      </div>
      <ThemeToggle/>
    </header>
  );
};

export {Header};
