import { QueryClient } from "@tanstack/react-query";

const STALE_TIME_MINUTES = 5;
const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MILLISECONDS_PER_MINUTE = SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND;

export interface MetaState {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  pageCount: number;
  totalCount: number;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME_MINUTES * MILLISECONDS_PER_MINUTE,
      retry: 1,
    },
  },
});

export interface IFormProps {
  form: {
    setValue: any;
    watch: any;
    control: any;
  };
}