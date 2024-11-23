import {useEffect, useState} from "react";
import {searchService} from "@/app/services/search-service";
import {IMovie} from "@/app/models/movie-interface";

interface UseSearchResultsOptions {
  query: string | null;
  initialPage?: number;
}

export const useSearchResults = ({query, initialPage = 1}: UseSearchResultsOptions) => {
  const [results, setResults] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(initialPage || 1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchService.searchMovies(query, currentPage);
        setResults(data.results);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };

    void fetchResults();
  }, [query, currentPage]);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return {results, loading, error, currentPage, totalPages, handlePageChange};
};