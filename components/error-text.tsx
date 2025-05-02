import { AnyFieldApi } from '@tanstack/react-form';

export default function ErrorText({ field }: { field: AnyFieldApi }) {
    return (
        <p className="text-sm text-red-500">
            {field.state.meta.errors.map((item) => item?.message).join(',')}
        </p>
    );
}
