import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import contactService from '../services/contactService';
import type { Contact } from '../types';

export const useContacts = (search?: string) => {
  const queryClient = useQueryClient();

  const contactsQuery = useQuery({
    queryKey: ['contacts', search],
    queryFn: () => contactService.getContacts(search),
  });

  const createMutation = useMutation({
    mutationFn: (contact: Omit<Contact, 'id'>) => contactService.createContact(contact),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, contact }: { id: string; contact: Partial<Contact> }) => 
      contactService.updateContact(id, contact),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => contactService.deleteContact(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });

  return {
    contacts: Array.isArray(contactsQuery.data) ? contactsQuery.data : [],
    isLoading: contactsQuery.isLoading,
    isError: contactsQuery.isError,
    error: contactsQuery.error,
    refetch: contactsQuery.refetch,

    createContact: createMutation.mutateAsync,
    isCreating: createMutation.isPending,

    updateContact: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,

    deleteContact: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};

export default useContacts;
