'use client';

import React, {useEffect, useState} from "react";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import Image from "next/image";

import {genreService} from "@/app/services/genre-service";
import {IMovie} from "@/app/models/movie-interface";
import {Pagination} from "../../common/pagination";
import {Loader} from "../../common/loader";
import styles from './MoviesByGenre.module.css';

const MoviesByGenre = () => {
  const {genreId} = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = Number(searchParams.get('page')) || 1;
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(initialPage);
  const [genreName, setGenreName] = useState<string>("");

  useEffect(() => {
    if (!genreId) return;

    const fetchGenreName = async () => {
      try {
        const genre = await genreService.getGenreById(Number(genreId));
        setGenreName(genre.name);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to fetch genre name");
        }
      }
    };

    const fetchMoviesByGenre = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await genreService.getMoviesByGenre(Number(genreId), page);
        setMovies(response.results);
        setTotalPages(response.total_pages);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to fetch movies");
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchGenreName();
    void fetchMoviesByGenre();
  }, [genreId, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.replace(`/genre/${genreId}?page=${newPage}`);
  };

  const handleMovieClick = (id: number) => {
    router.push(`/movie/${id}?fromPage=${page}`);
  };

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <div className={styles.errorText}>Error: {error}</div>;
  }

  return (
    <div className={styles.genreMoviesListContainer}>
      <h1>{genreName || "Movies"}</h1>
      {movies.length ? (
        <div className={styles.moviesGrid}>
          {movies.map((movie) => (
            <div
              key={movie.id}
              className={styles.movieItem}
              onClick={() => handleMovieClick(movie.id)}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={240}
                  height={360}
                  className={styles.movieImage}
                  priority={true}
                />
              </div>
              <p className={styles.movieTitle}>{movie.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No movies available.</p>
      )}
      {totalPages > 1 && (
        <div className={styles.paginationContainer}>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export {MoviesByGenre};
