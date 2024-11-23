import {useEffect, useState} from "react";

import {genreService} from "@/app/services/genre-service";
import {IGenre} from "@/app/models/genre-interface";
import {IMovieResponse} from "@/app/models/movie-interface";

export const useGenres = () => {
  const [genres, setGenres] = useState<(IGenre & { movieCount?: number })[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await genreService.getAllGenres();
        const genresWithCounts = await Promise.all(
          data.genres.map(async (genre: IGenre) => {
            try {
              const movies: IMovieResponse = await genreService.getMoviesByGenre(genre.id, 1);
              return {...genre, movieCount: movies.total_results};
            } catch {
              return {...genre, movieCount: 0};
            }
          })
        );
        setGenres(genresWithCounts);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to fetch genres");
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchGenres();
  }, []);

  return {genres, loading, error};
};
