import {fetchWithAuth} from "@/app/services/api-service";
import {urls} from "@/app/constants";
import {IGenre} from "@/app/models/genre-interface";
import {IMovieResponse} from "@/app/models/movie-interface";

const genreService = {
  getAllGenres: async (): Promise<{ genres: IGenre[] }> => {
    return fetchWithAuth(urls.genres.getAllGenres);
  },
  getMoviesByGenre: async (genreId: number, page: number): Promise<IMovieResponse> => {
    const params = { page, with_genres: genreId };
    return fetchWithAuth(urls.movies.getAllMovies, {}, params);
  },
  getGenreById: async (genreId: number): Promise<IGenre> => {
    const { genres } = await fetchWithAuth(urls.genres.getAllGenres);
    const genre = genres.find((g: IGenre) => g.id === genreId);
    if (!genre) {
      throw new Error(`Genre with ID ${genreId} not found`);
    }
    return genre;
  }
};

export {genreService};
