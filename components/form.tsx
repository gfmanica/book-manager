import { ReactFormExtendedApi } from '@tanstack/react-form';
import { Loader, Save } from 'lucide-react';
import { ZodSchema } from 'zod';

import useFormController from '@/hooks/use-form-controller';

import { Button } from './ui/button';
import { SidebarTrigger } from './ui/sidebar';

type FormReturn<T> = ReactFormExtendedApi<
    T,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
>;

type Form<T> = {
    idProperty: keyof T;
    title: string;
    endpoint: string;
    initialValues: T;
    validationSchema: ZodSchema<T>;
    children: ({
        form,
        isLoading,
        isPending
    }: {
        form: FormReturn<T>;
        isLoading: boolean;
        isPending: boolean;
    }) => React.ReactNode;
};

export function Form<T>({
    idProperty,
    title,
    endpoint,
    initialValues,
    validationSchema,
    children
}: Form<T>) {
    const { form, isLoading, isPending, id } = useFormController({
        endpoint,
        idProperty,
        initialValues,
        validationSchema
    });

    return (
        <div>
            <div className="flex items-center gap-2 p-4">
                <SidebarTrigger />

                <h1 className="text-2xl font-bold">
                    {id ? 'Editar' : 'Cadastrar'} {title.toLowerCase()}
                </h1>
            </div>

            <form
                className="flex flex-col gap-4 p-4 pt-0"
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
            >
                {children({ form: form as any, isLoading, isPending })}

                <div className="flex w-full justify-end">
                    <Button variant="default" type="submit">
                        {isPending && <Loader className="animate-spin" />}
                        {!isPending && <Save />}
                        Salvar
                    </Button>
                </div>
            </form>
        </div>
    );
}
