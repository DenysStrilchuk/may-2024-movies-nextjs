'use client';

import React from "react";
import {useSearchParams, useRouter} from "next/navigation";
import Image from "next/image";

import {Loader} from "@/app/components/common/loader";
import {Pagination} from "@/app/components/common/pagination";
import {useSearchResults} from "@/app/hooks/use-search";
import styles from "./SearchResults.module.css";
import {Routes} from "@/app/utils/routes";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("query");
  const initialPage = Number(searchParams.get("page")) || 1;

  const {
    results,
    loading,
    error,
    currentPage,
    totalPages,
    handlePageChange
  } = useSearchResults({query, initialPage});

  const handleMovieClick = (id: number) => {
    router.push(`${Routes.MOVIE}/${id}`);
  };

  const handlePaginationChange = (page: number) => {
    handlePageChange(page);
    router.push(`/search?query=${query}&page=${page}`);
  };

  if (!query) {
    return <p>Please enter a search query.</p>;
  }

  return (
    <div className={styles.searchListContainer}>
      <h1>Search Results for "{query}"</h1>
      {loading && <Loader/>}
      {error && <div className={styles.errorText}>{error}</div>}
      {!loading && !error && results.length === 0 && (
        <p>No results found.</p>
      )}
      {!loading && !error && results.length > 0 && (
        <div className={styles.moviesGrid}>
          {results.map((movie) => (
            <div
              key={movie.id}
              className={styles.movieItem}
              onClick={() => handleMovieClick(movie.id)}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/placeholder.png"
                  }
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
      )}
      <div className={styles.paginationContainer}>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePaginationChange}
          />
        )}
      </div>
    </div>
  );
};

export {SearchResults};
