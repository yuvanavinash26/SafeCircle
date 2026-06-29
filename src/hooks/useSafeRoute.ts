import { useMutation } from '@tanstack/react-query';
import routeService from '../services/routeService';
import type { SafeRouteQuery } from '../types';

export const useSafeRoute = () => {
  const mutation = useMutation({
    mutationFn: (query: SafeRouteQuery) => routeService.getSafeRoutes(query),
  });

  return {
    getSafeRoutes: mutation.mutateAsync,
    routes: Array.isArray(mutation.data) ? mutation.data : [],
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};

export default useSafeRoute;
