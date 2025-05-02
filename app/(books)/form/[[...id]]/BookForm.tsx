'use client';

import { useForm } from '@tanstack/react-form';
import { z } from 'zod';

import ErrorText from '@/components/error-text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Book } from '@/types';

const bookSchema = z.object({
    id: z.number().int().nonnegative(),
    title: z.string().min(1, 'Título é obrigatório'),
    author: z.string().min(1, 'Autor é obrigatório'),
    category: z.string().min(1, 'Categoria é obrigatória'),
    cover: z.string().url('A capa deve ser uma URL válida'),
    description: z.string().min(1, 'Descrição é obrigatória'),
    publicationYear: z
        .number()
        .int()
        .min(1900, 'O ano deve ser posterior a 1900')
        .max(new Date().getFullYear(), 'O ano não pode estar no futuro')
});

const defaultValues: Book = {
    author: '',
    category: '',
    cover: '',
    description: '',
    publicationYear: 2025,
    title: '',
    id: 0
};

export default function BookForm({id}: {id?: string}) {
    // const {data, isLoading} = useQuery({
    //     queryKey: ['data'],
    //     queryFn: async () => {
    //       await new Promise((resolve) => setTimeout(resolve, 1000))
    //       return {firstName: 'FirstName', lastName: "LastName"}
    //     }
    //   })

    const form = useForm({
        defaultValues,
        // defaultValues: data || defaultValues,
        onSubmit: async ({ value }) => {
            // Do something with form data
            console.log(value);
        },
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
                            <Label>Autor</Label>
                            <Input
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
                    name="category"
                    children={(field) => (
                        <div className="flex flex-col gap-2">
                            <Label>Categoria</Label>
                            <Input
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
                    name="cover"
                    children={(field) => (
                        <div className="flex flex-col gap-2">
                            <Label>Capa (URL)</Label>
                            <Input
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
                    name="description"
                    children={(field) => (
                        <div className="flex flex-col gap-2">
                            <Label>Descrição</Label>
                            <Input
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
                            <Label>Ano de Publicação</Label>
                            <Input
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

                <div className="flex w-full justify-end">
                    <Button variant="default" type="submit">
                        Salvar
                    </Button>
                </div>
            </form>
        </div>
    );
}
