import {IMovie, IMovieResponse, IVideo} from "@/app/models/movie-interface";
import {fetchWithAuth} from "@/app/services/api-service";
import {urls} from "../../constants";

const movieService = {
  getAllMovies: async (page: number): Promise<IMovieResponse> => {
    return fetchWithAuth(urls.movies.getAllMovies, {}, {page});
  },
  getMovieById: async (id: number): Promise<IMovie> => {
    return fetchWithAuth(urls.movies.getMovieById(id));
  },
  getMovieTrailer: async (id: number): Promise<IVideo | undefined> => {
    const data = await fetchWithAuth(urls.movies.getMovieTrailer(id));
    return data.results.find((video: IVideo) => video.type === "Trailer");
  }
};

export {movieService};
