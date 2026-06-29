import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import sosService from '../services/sosService';
import type { SOSRequest, SOSResponse } from '../types';

export const useEmergency = () => {
  const queryClient = useQueryClient();

  const historyQuery = useQuery({
    queryKey: ['sosHistory'],
    queryFn: sosService.getSOSHistory,
    refetchInterval: 10000, // Poll every 10s for updates
  });

  const triggerSOSMutation = useMutation({
    mutationFn: (req: SOSRequest) => sosService.triggerSOS(req),
    onSuccess: (data) => {
      // Invalidate query to refetch updated timeline history
      queryClient.invalidateQueries({ queryKey: ['sosHistory'] });
    },
  });

  const resolveSOSMutation = useMutation({
    mutationFn: (incidentId: string) => sosService.resolveSOS(incidentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sosHistory'] });
    },
  });

  return {
    history: Array.isArray(historyQuery.data) ? historyQuery.data : [],
    isLoadingHistory: historyQuery.isLoading,
    isErrorHistory: historyQuery.isError,
    refetchHistory: historyQuery.refetch,

    triggerSOS: triggerSOSMutation.mutateAsync,
    isTriggering: triggerSOSMutation.isPending,
    triggerError: triggerSOSMutation.error,
    triggerSuccess: triggerSOSMutation.isSuccess,

    resolveSOS: resolveSOSMutation.mutateAsync,
    isResolving: resolveSOSMutation.isPending,
    resolveError: resolveSOSMutation.error,
  };
};

export default useEmergency;
