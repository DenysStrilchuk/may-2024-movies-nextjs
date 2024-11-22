import {IGenre} from "@/app/models/genre-interface";

export interface IVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

export interface IMovie {
  id: number;
  title: string;
  poster_path: string;
  overview?: string;
  genres?: IGenre[];
  release_date?: string;
  runtime?: number;
  vote_average?: number;
  vote_count?: number;
  production_countries: { iso_3166_1: string; name: string }[];
  backdrop_path?: string;
  certification?: string;
  include_adult?: boolean;
  include_video?: boolean;
  language?: string;
  primary_release_year?: number;
  certification_country?: string;
  release_date_gte?: string;
  release_date_lte?: string;
  watch_region?: string;
  with_genres?: string;
  with_keywords?: string;
  with_cast?: string;
  with_companies?: string;
  with_crew?: string;
  trailerKey?: string | null;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
}

export interface IMovieResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
