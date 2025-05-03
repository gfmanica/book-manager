import Link from 'next/link';

import { Pencil, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { ConfirmDialog } from './confirm-dialog';
import Tooltip from './tooltip';

type CardActions = {
    editRoute: string;
    deleteRoute: string;
};

export default function CardActions({ editRoute, deleteRoute }: CardActions) {
    return (
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

            <ConfirmDialog>
                <Tooltip text="Excluir">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer text-red-500 hover:text-red-500"
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                </Tooltip>
            </ConfirmDialog>
        </div>
    );
}
