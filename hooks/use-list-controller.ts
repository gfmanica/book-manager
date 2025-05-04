import { useSearchParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { Axios } from '@/lib/axios';

export default function useListController<T>({
    endpoint
}: {
    endpoint: string;
}) {
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';
    const url = `${endpoint}${query ? `?query=${query}` : ''}`;

    return useQuery<T[]>({
        queryKey: [endpoint, query],
        queryFn: () => Axios.get(url).then((res) => res.data),
        initialData: []
    });
}
