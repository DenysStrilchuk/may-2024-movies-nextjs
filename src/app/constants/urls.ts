const baseUrl = process.env.NEXT_PUBLIC_MOVIES_BASE_URL;

const urls = {
  movies: {
    getAllMovies: '/discover/movie',
    getMovieById: (id: number): string => `/movie/${id}`,
    getMovieTrailer: (id:number): string => `/movie/${id}/videos`
  },
  genres: {
    getAllGenres: '/genre/movie/list',
  }
};

export {
  urls,
  baseUrl
};
