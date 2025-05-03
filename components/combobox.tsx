import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { Check, ChevronsUpDown, Loader } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover';
import { Axios } from '@/lib/axios';

import { Label } from './ui/label';

type Combobox<T> = {
    url: string;
    label?: string;
    placeholder?: string;
    getOptionLabel: (item: T) => string;
    getOptionValue: (item: T) => string | number;
    value: T | null;
    onChange: (item: T | null) => void;
    disabled?: boolean;
};

export function Combobox<T>({
    url,
    label,
    placeholder = 'Selecione uma opção...',
    getOptionLabel,
    getOptionValue,
    value,
    onChange,
    disabled
}: Combobox<T>) {
    const [open, setOpen] = React.useState(false);

    const { data, isLoading, error } = useQuery<T[]>({
        queryKey: [url],
        queryFn: () => Axios.get(url).then((res) => res.data),
        initialData: []
    });

    const selectedItem = value
        ? data.find((item) => getOptionValue(item) === getOptionValue(value))
        : null;

    const handleSelect = (item: T) => {
        onChange(isSameValue(item) ? null : item);

        setOpen(false);
    };

    const isSameValue = (item: T) => {
        if (!value) return false;

        return getOptionValue(item) === getOptionValue(value);
    };

    return (
        <div className="flex w-full flex-col gap-2">
            {label && <Label>{label}</Label>}

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between font-normal"
                        disabled={disabled}
                    >
                        {selectedItem ? (
                            getOptionLabel(selectedItem)
                        ) : (
                            <p className="text-muted-foreground">
                                {placeholder}
                            </p>
                        )}

                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
                    <Command>
                        <CommandInput placeholder="Buscar..." />

                        <CommandEmpty>
                            Nenhum resultado encontrado.
                        </CommandEmpty>

                        <CommandGroup>
                            {isLoading && (
                                <Loader className="mx-auto mt-2 h-6 w-6 animate-spin" />
                            )}

                            {!isLoading && error && (
                                <div className="p-2 text-sm text-red-500">
                                    Erro ao carregar dados.
                                </div>
                            )}

                            {!isLoading &&
                                !error &&
                                data.map((item) => {
                                    const itemValue = getOptionValue(item);
                                    const itemLabel = getOptionLabel(item);
                                    const isSelected =
                                        value &&
                                        itemValue === getOptionValue(value);

                                    return (
                                        <CommandItem
                                            key={itemValue}
                                            onSelect={() => handleSelect(item)}
                                            className="cursor-pointer"
                                        >
                                            <Check
                                                data-selected={isSelected}
                                                className="mr-2 h-4 w-4 opacity-0 data-[selected=true]:opacity-100"
                                            />

                                            {itemLabel}
                                        </CommandItem>
                                    );
                                })}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
