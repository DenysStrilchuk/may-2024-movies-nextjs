import {ISearch} from "@/app/models/search-interface";
import {fetchWithAuth} from "@/app/services/api-service";
import {urls} from "../../constants";

const searchService = {
  searchMovies: async (query: string, page: number = 1): Promise<ISearch> => {
    return fetchWithAuth(urls.search.searchMovies, {}, {query, page});
  }
};

export {searchService};
