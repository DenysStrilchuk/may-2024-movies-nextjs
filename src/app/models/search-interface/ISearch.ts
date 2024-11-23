import {IMovie} from "@/app/models/movie-interface";

export interface ISearch {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}