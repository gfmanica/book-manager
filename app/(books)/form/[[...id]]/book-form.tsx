'use client';

import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { Loader, Save } from 'lucide-react';
import { z } from 'zod';

import { Combobox } from '@/components/combobox';
import ErrorText from '@/components/error-text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Axios } from '@/lib/axios';
import { Author, Book, Category } from '@/types';

const authorSchema = z.object({
    id: z.number().int().nonnegative(),
    name: z.string().min(1, 'Nome do autor é obrigatório')
});

const categorySchema = z.object({
    id: z.number().int().nonnegative(),
    name: z.string().min(1, 'Nome do autor é obrigatório')
});

const bookSchema = z.object({
    id: z.number().int().nonnegative(),
    title: z.string().min(1, 'Título é obrigatório'),
    author: authorSchema
        .nullable()
        .refine((value) => value !== null, 'O autor é obrigatório'),
    category: authorSchema
        .nullable()
        .refine((value) => value !== null, 'A categoria é obrigatória'),
    cover: z.string().url('A capa deve ser uma URL válida'),
    description: z.string().min(1, 'Descrição é obrigatória'),
    publicationYear: z
        .number()
        .int()
        .min(1900, 'O ano deve ser posterior a 1900')
        .max(new Date().getFullYear(), 'O ano não pode estar no futuro')
});

const defaultValues: Book = {
    author: null,
    category: null,
    cover: '',
    description: '',
    publicationYear: 2025,
    title: '',
    id: 0
};

export default function BookForm({ id }: { id?: string }) {
    const { data, isLoading } = useQuery<Book>({
        queryKey: ['books', id],
        queryFn: () => Axios.get(`/books/${id}`).then((res) => res.data.data),
        enabled: Boolean(id)
    });

    const { mutate, isPending } = useMutation<
        AxiosResponse<{ data: Book; message: string }>,
        AxiosError<{ message: string; status: string }>,
        Book
    >({
        mutationFn: (data) =>
            id
                ? Axios.put(`/books/${data.id}`, data)
                : Axios.post(`/books`, data)
    });

    const form = useForm({
        defaultValues: data || defaultValues,
        onSubmit: ({ value }) => mutate(value),
        validators: {
            onSubmit: bookSchema
        }
    });

    return (
        <div>
            <h1 className="p-4 text-2xl font-bold">Cadastrar livro</h1>

            <form
                className="flex flex-col gap-4 p-4 pt-0"
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
            >
                <form.Field
                    name="title"
                    children={(field) => (
                        <div className="flex flex-col gap-2">
                            <Label>Título</Label>
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
                    name="author"
                    children={(field) => (
                        <div className="flex flex-col gap-2">
                            <Combobox<Author>
                                label="Autor"
                                disabled={isLoading || isPending}
                                value={field.state.value}
                                url="/authors"
                                getOptionLabel={(item) => item.name}
                                getOptionValue={(item) => item.id}
                                onChange={(item) => field.handleChange(item)}
                            />

                            <ErrorText field={field} />
                        </div>
                    )}
                />

                <form.Field
                    name="category"
                    children={(field) => (
                        <div className="flex flex-col gap-2">
                            <Combobox<Category>
                                label="Categoria"
                                disabled={isLoading || isPending}
                                value={field.state.value}
                                url="/categories"
                                getOptionLabel={(item) => item.name}
                                getOptionValue={(item) => item.id}
                                onChange={(item) => field.handleChange(item)}
                            />

                            <ErrorText field={field} />
                        </div>
                    )}
                />

                <form.Field
                    name="cover"
                    children={(field) => (
                        <div className="flex flex-col gap-2">
                            <Label>Capa (URL)</Label>
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
                    name="publicationYear"
                    children={(field) => (
                        <div className="flex flex-col gap-2">
                            <Label>Ano de publicação</Label>
                            <Input
                                disabled={isLoading || isPending}
                                type="number"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                    field.handleChange(Number(e.target.value))
                                }
                            />
                            <ErrorText field={field} />
                        </div>
                    )}
                />

                <form.Field
                    name="description"
                    children={(field) => (
                        <div className="flex flex-col gap-2">
                            <Label>Descrição</Label>
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
