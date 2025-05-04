import { useState } from 'react';
import Link from 'next/link';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { Pencil, Trash } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Axios } from '@/lib/axios';

import { ConfirmDialog } from './confirm-dialog';
import Tooltip from './tooltip';

type CardActions = {
    editRoute: string;
    deleteRoute: string;
    queryKey: string;
};

export default function CardActions({
    editRoute,
    deleteRoute,
    queryKey
}: CardActions) {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const { mutate } = useMutation<
        AxiosResponse<{ message: string }>,
        AxiosError<{ error: string }>
    >({
        mutationFn: () => Axios.delete(deleteRoute),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: [queryKey]
            }),
        onError: (error) => toast.error(error.response?.data.error),
        onSettled: () => setOpen(false)
    });

    return (
        <>
            <ConfirmDialog
                open={open}
                description="Você tem certeza que deseja excluir?"
                confirmAction={mutate}
                onOpenChange={(value) => setOpen(value)}
            />

            <div className="flex justify-end gap-1 border-t px-1.5 py-0.5">
                <Tooltip text="Editar">
                    <Link href={editRoute}>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="cursor-pointer"
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </Link>
                </Tooltip>

                <Tooltip text="Excluir">
                    <Button
                        onClick={() => setOpen(true)}
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer text-red-500 hover:text-red-500"
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                </Tooltip>
            </div>
        </>
    );
}
