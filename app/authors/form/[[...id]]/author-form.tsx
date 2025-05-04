'use client';

import { useRouter } from 'next/navigation';

import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { Loader, Save } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

import ErrorText from '@/components/error-text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Axios } from '@/lib/axios';
import { Author } from '@/types';

const authorSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, 'Nome é obrigatório'),
    biography: z.string().optional()
});

const defaultValues: Author = {
    name: '',
    biography: ''
};

export default function AuthorForm({ id }: { id?: string }) {
    const router = useRouter();

    const { data, isLoading } = useQuery<Author>({
        queryKey: ['authors', id],
        queryFn: () => Axios.get(`/authors/${id}`).then((res) => res.data),
        enabled: Boolean(id)
    });

    const { mutate, isPending } = useMutation<
        AxiosResponse<{ data: Author; message: string }>,
        AxiosError<{ message: string; status: string }>,
        Author
    >({
        mutationFn: (data) =>
            id
                ? Axios.put(`/authors/${data.id}`, data)
                : Axios.post(`/authors`, data),
        onSuccess: (res) => {
            router.push(`/authors/form/${res.data.data.id}`);

            toast.success(res.data.message);
        },
        onError: (error) => toast.error(error.response?.data.message)
    });

    const form = useForm({
        defaultValues: data || defaultValues,
        onSubmit: ({ value }) => mutate(value),
        validators: {
            onSubmit: authorSchema
        }
    });

    return (
        <div>
            <h1 className="p-4 text-2xl font-bold">Cadastrar autor</h1>

            <form
                className="flex flex-col gap-4 p-4 pt-0"
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
            >
                <form.Field
                    name="name"
                    children={(field) => (
                        <div className="flex flex-col gap-2">
                            <Label>Nome</Label>
                            <Input
                                disabled={isLoading || isPending}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                            />
                            <ErrorText field={field} />
                        </div>
                    )}
                />

                <form.Field
                    name="biography"
                    children={(field) => (
                        <div className="flex flex-col gap-2">
                            <Label>Biografia</Label>
                            <Textarea
                                disabled={isLoading || isPending}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                            />
                            <ErrorText field={field} />
                        </div>
                    )}
                />

                <div className="flex w-full justify-end">
                    <Button variant="default" type="submit">
                        {isPending ? (
                            <Loader className="animate-spin" />
                        ) : (
                            <Save />
                        )}
                        Salvar
                    </Button>
                </div>
            </form>
        </div>
    );
}
