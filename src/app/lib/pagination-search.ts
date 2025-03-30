import { create } from "zustand";

interface PaginationState {
  page: number;
  limit: number;
  updatePagination: (newPagination: Partial<PaginationState>) => void;
  resetPage: () => void;
}

interface SearchState {
  search: string;
  updateSearch: (newSearch: string) => void;
}

const updatePaginationLogic = (newPagination: Partial<PaginationState>) => (state: PaginationState) => ({
  ...state,
  ...newPagination,
});

const resetPageLogic = () => ({ page: 1 });

export const usePaginationStore = create<PaginationState>((set) => ({
  page: 1,
  limit: 10,
  updatePagination: (newPagination) => set(updatePaginationLogic(newPagination)),
  resetPage: () => set(resetPageLogic()),
}));

const updateSearchLogic = (newSearch: string) => () => ({ search: newSearch });

export const useSearchStore = create<SearchState>((set) => ({
  search: "",
  updateSearch: (newSearch) => set(updateSearchLogic(newSearch)),
}));