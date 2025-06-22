// query/client.ts
import { QueryClient } from '@tanstack/react-query';

let queryClient: QueryClient | null = null;

export function getQueryClient() {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5, // 5 minutes
          // cacheTime: 1000 * 60 * 10, // 10 minutes
          retry: 2,
          refetchOnWindowFocus: false,
        },
      },
    });
  }
  return queryClient;
}
