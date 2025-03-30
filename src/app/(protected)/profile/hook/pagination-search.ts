/* eslint-disable max-nested-callbacks */
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

export const usePaginationStore = create<PaginationState>((set) => ({
  page: 1,
  limit: 10,
  updatePagination: (newPagination) => { set((state) => ({ ...state, ...newPagination })); },
  resetPage: () => { set({ page: 1 }); },
}));

export const useSearchStore = create<SearchState>((set) => ({
  search: "",
  updateSearch: (newSearch) => { set(() => ({ search: newSearch })); },
}));
