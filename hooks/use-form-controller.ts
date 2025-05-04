import { useParams, usePathname, useRouter } from 'next/navigation';

import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { ZodSchema } from 'zod';

import { Axios } from '@/lib/axios';

type UseFormController<T> = {
    idProperty: keyof T;
    endpoint: string;
    initialValues: T;
    validationSchema: ZodSchema<T>;
};

export default function useFormController<T>({
    idProperty,
    endpoint,
    initialValues,
    validationSchema
}: UseFormController<T>) {
    const router = useRouter();
    const pathname = usePathname();
    const { id } = useParams();

    const { data, isLoading } = useQuery<T>({
        queryKey: [endpoint, id],
        queryFn: () => Axios.get(`${endpoint}/${id}`).then((res) => res.data),
        enabled: Boolean(id)
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

    const form = useForm({
        defaultValues: data || initialValues,
        onSubmit: ({ value }) => mutate(value),
        validators: {
            onSubmit: validationSchema
        }
    });

    return { form, isLoading, isPending, id };
}
