import {
    TooltipContent,
    TooltipTrigger,
    Tooltip as TooltipUi
} from '@/components/ui/tooltip';

export default function Tooltip({
    children,
    text
}: {
    children: React.ReactNode;
    text: string;
}) {
    return (
        <TooltipUi>
            <TooltipTrigger asChild>{children}</TooltipTrigger>

            <TooltipContent>
                <p>{text}</p>
            </TooltipContent>
        </TooltipUi>
    );
}
