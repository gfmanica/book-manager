'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import useDebounce from '@/hooks/use-debounce';

import { Input } from './ui/input';

export default function SearchInput({placeholder}: { placeholder?: string }) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const initialValue = searchParams.get('query') || '';
    const [value, setValue] = useState(initialValue);
    const debouncedValue = useDebounce(value, 300);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedValue) {
            params.set('query', debouncedValue);
        } else {
            params.delete('query');
        }

        router.replace(`?${params.toString()}`);
    }, [debouncedValue]);

    return (
        <Input
            placeholder={placeholder || 'Pesquisar...'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}
