"use client";

import {useState, useEffect} from "react";
import {usePathname} from "next/navigation";

import {IMovieResponse} from "@/app/models/movie-interface";
import {genreService} from "@/app/services/genre-service";
import {IGenre} from "@/app/models/genre-interface";
import {Loader} from "../../common/loader";
import styles from "./Genre.module.css";

interface GenreProps {
  genre: IGenre;
  isActive: boolean;
  onGenreClick: (genre: IGenre) => void;
}

const Genre = ({genre, isActive, onGenreClick}: GenreProps) => {
  const [movieCount, setMovieCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname();

  const isGenresPage = pathname.startsWith("/genres");

  const fetchMoviesByGenre = async () => {
    if (!genre) return;

    try {
      setLoading(true);
      const data: IMovieResponse = await genreService.getMoviesByGenre(genre.id, 1);
      setMovieCount(data.total_results);
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (genre) {
      void fetchMoviesByGenre();
    }
  }, [genre?.id]);

  if (!genre) {
    return null;
  }

  return (
    <div>
      <button
        className={`${styles.genreBadge} ${isActive && isGenresPage ? styles.active : ""}`}
        onClick={() => {
          if (onGenreClick && genre) {
            onGenreClick(genre);
          }
        }}
      >
        {genre.name}
        {loading ? (
          <span className={styles.loaderWrapper}>
            <Loader/>
          </span>
        ) : (
          <span className={styles.countBadge}>{movieCount}</span>
        )}
      </button>
    </div>
  );
};

export {Genre};
