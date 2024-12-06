const baseUrl = 'https://api.themoviedb.org/3';

const urls = {
  movies: {
    getAllMovies: '/discover/movie',
    getMovieById: (id: number): string => `/movie/${id}`,
    getMovieTrailer: (id:number): string => `/movie/${id}/videos`
  },
  genres: {
    getAllGenres: '/genre/movie/list',
  },
  search: {
    searchMovies: '/search/movie',
  },
};

export {
  urls,
  baseUrl
};
