import { Pencil, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from '@/components/ui/tooltip';

export default function CategoryCardActions() {
    return (
        <div className="flex justify-end gap-1 border-t px-1.5 py-0.5">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                </TooltipTrigger>

                <TooltipContent>
                    <p>Editar</p>
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer text-red-500 hover:text-red-500"
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                </TooltipTrigger>

                <TooltipContent>
                    <p>Excluir</p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}
