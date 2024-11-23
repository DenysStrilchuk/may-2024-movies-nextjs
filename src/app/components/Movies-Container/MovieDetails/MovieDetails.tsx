"use client";

import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import Image from "next/image";

import {movieService} from "@/app/services/movie-service";
import {IMovie} from "@/app/models/movie-interface";
import {GenreBadge} from "@/app/components/common/genre-badge";
import {Loader} from "../../common/loader";
import {StarRatingComponent} from "../../common/star-rating";
import styles from "./MovieDetails.module.css";

const MovieDetails = () => {
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const router = useRouter();
  const {id} = params;

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);

      try {
        const movieData = await movieService.getMovieById(parseInt(id as string, 10));
        const trailer = await movieService.getMovieTrailer(movieData.id);
        setMovie({...movieData, trailerKey: trailer?.key || null});
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to fetch movie");
      } finally {
        setLoading(false);
      }
    };

    void fetchMovie();
  }, [id]);

  if (loading) return <Loader/>;
  if (error) return <div className={styles.errorText}>Error: {error}</div>;
  if (!movie) return <div className={styles.errorText}>Movie not found</div>;

  const handleBackButtonClick = () => {
    router.back();
  };

  return (
    <div className={styles.movieDetail}>
      <div className={styles.leftSection}>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={styles.movieImage}
          width={500}
          height={750}
          priority
        />
        <div className={styles.starRatingWrapper}>
          <StarRatingComponent rating={movie.vote_average ?? 0} size={40}/>
        </div>
        <div className={styles.additionalInfo}>
          <p><strong>Release Year:</strong> {movie.release_date || "Unknown"}</p>
          <p><strong>Country:</strong>
            {movie.production_countries?.length > 0
              ? movie.production_countries.map((country) => country.name).join(", ")
              : "Unknown"}
          </p>
          <p><strong>Duration:</strong> {movie.runtime ? `${movie.runtime} min` : "Unknown"}</p>
          <p><strong>Spoken Language:</strong>
            {movie.spoken_languages?.length > 0
              ? movie.spoken_languages.map((language) => language.english_name).join(", ")
              : "Unknown"}
          </p>
          <p>
            <strong>IMDb Rating:</strong> {movie.vote_average || "Unknown"}/
            {movie.vote_count || "0"}
          </p>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.trailer}>
          {movie.trailerKey && movie.trailerKey !== "null" ? (
            <iframe
              src={`https://www.youtube.com/embed/${movie.trailerKey}`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Trailer"
              className={styles.trailerVideo}
            />
          ) : (
            <p>Trailer unavailable</p>
          )}
        </div>
        <div className={styles.description}>
          <h2>Description</h2>
          <p>{movie.overview || "Description not available"}</p>
        </div>
        <div className={styles.genres}>
            {movie.genres?.length ? (
              movie.genres.map((genre) => (
                <GenreBadge
                  key={genre.id}
                  genreId={genre.id}
                  genreName={genre.name}
                />
              ))
            ) : (
              "Unknown"
            )}
        </div>
        <button className={styles.backButton} onClick={handleBackButtonClick}>
          Back to movies
        </button>
      </div>
    </div>
  );
};

export {MovieDetails};
