"use client";

import {useEffect, useState} from "react";
import {useSearchParams, useRouter} from "next/navigation";

import {movieService} from "@/app/services/movie-service";
import {IMovie} from "@/app/models/movie-interface";
import {Pagination} from "../../common/Pagination-Container";
import Image from "next/image";
import styles from "./MoviesList.module.css";
import {Loader} from "@/app/components/common/Loader-Container";

const MoviesList = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await movieService.getAllMovies(page);
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

    fetchMovies().catch((err) =>
      setError(err instanceof Error ? err.message : "Unexpected error occurred")
    );
  }, [page]);

  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}`);
  };

  const handleMovieClick = (id: number) => {
    router.push(`/movie/${id}`);
  };

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <div className={styles.errorText}>Error: {error}</div>;
  }

  return (
    <div className={styles.moviesListContainer}>
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

export {MoviesList};
