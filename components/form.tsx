import { useParams, usePathname, useRouter } from 'next/navigation';

import { ReactFormExtendedApi, useForm } from '@tanstack/react-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { Loader, Save } from 'lucide-react';
import { toast } from 'sonner';
import { ZodSchema } from 'zod';

import { Axios } from '@/lib/axios';

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
    const router = useRouter();
    const pathname = usePathname();
    const { id } = useParams();

    const { data, isLoading } = useQuery<T>({
        queryKey: [endpoint, id],
        queryFn: () => Axios.get(`${endpoint}/${id}`).then((res) => res.data),
        enabled: Boolean(id)
    });

    const form = useForm({
        defaultValues: data || initialValues,
        onSubmit: ({ value }) => mutate(value),
        validators: {
            onSubmit: validationSchema
        }
    });

    const { mutate, isPending } = useMutation<
        AxiosResponse<{ data: T; message: string }>,
        AxiosError<{ message: string; status: string }>,
        T
    >({
        mutationFn: (data) =>
            id
                ? Axios.put(`${endpoint}/${data[idProperty]}`, data)
                : Axios.post(`${endpoint}`, data),
        onSuccess: (res) => {
            if (!id) {
                router.push(`${pathname}/${res.data.data[idProperty]}`);
            }

            toast.success(res.data.message);
        },
        onError: (error) => toast.error(error.response?.data.message)
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
