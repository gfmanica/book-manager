import { useState } from 'react';
import Link from 'next/link';

import { Pencil, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import useDeleteController from '@/hooks/use-delete-controller';

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
    const { mutate } = useDeleteController({
        endpoint: deleteRoute,
        invalidateQueryKey: queryKey,
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
