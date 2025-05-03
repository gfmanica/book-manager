import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog';

import { Button } from './ui/button';

type ConfirmDialog = {
    title?: string;
    description?: string;
    cancelText?: string;
    confirmText?: string;
    confirmAction: () => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export function ConfirmDialog({
    title = 'Confirmação',
    description,
    cancelText = 'Cancelar',
    confirmText = 'Confirmar',
    confirmAction,
    open,
    onOpenChange
}: ConfirmDialog) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>

                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelText}</AlertDialogCancel>

                    <Button onClick={() => confirmAction()}>
                        {confirmText}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
