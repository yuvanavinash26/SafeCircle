import { useQuery } from '@tanstack/react-query';
import analyticsService from '../services/analyticsService';

export const useAnalytics = () => {
  const query = useQuery({
    queryKey: ['analytics'],
    queryFn: analyticsService.getAnalyticsData,
  });

  return {
    analytics: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

export default useAnalytics;
