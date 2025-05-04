import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'sonner';

import { Axios } from '@/lib/axios';

export default function useDeleteController({
    endpoint,
    invalidateQueryKey,
    onSettled
}: {
    endpoint: string;
    invalidateQueryKey: string;
    onSettled?: () => void;
}) {
    const queryClient = useQueryClient();

    return useMutation<
        AxiosResponse<{ message: string }>,
        AxiosError<{ error: string }>
    >({
        mutationFn: () => Axios.delete(endpoint),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: [invalidateQueryKey]
            }),
        onError: (error) => toast.error(error.response?.data.error),
        onSettled
    });
}
