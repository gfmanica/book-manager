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

type ConfirmDialog = {
    title?: string;
    description?: string;
    cancelText?: string;
    confirmText?: string;
    confirmAction?: () => void;
    children: React.ReactNode;
};

export function ConfirmDialog({
    title = 'Confirmação',
    description,
    cancelText = 'Cancelar',
    confirmText = 'Confirmar',
    confirmAction,
    children
}: ConfirmDialog) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>

                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelText}</AlertDialogCancel>

                    <AlertDialogAction>{confirmText}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
