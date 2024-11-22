export interface IGenre {
  id: number;
  name: string;
}

export interface IGenreResponse {
  page: number;
  results: IGenre[];
  total_pages: number;
  total_results: number;
}