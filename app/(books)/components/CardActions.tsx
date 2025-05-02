import { Pencil, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from '@/components/ui/tooltip';

export default function CardActions() {
    return (
        <div className="flex justify-end gap-2 border-t p-2">
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
