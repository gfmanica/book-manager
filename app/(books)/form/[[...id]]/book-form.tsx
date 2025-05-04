'use client';

import { z } from 'zod';

import { Combobox } from '@/components/combobox';
import ErrorText from '@/components/error-text';
import { Form } from '@/components/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
    id: z.number().optional(),
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
    title: ''
};

export default function BookForm() {
    return (
        <Form<Book>
            idProperty="id"
            title="Livro"
            endpoint="/books"
            initialValues={defaultValues}
            validationSchema={bookSchema}
        >
            {({ form, isLoading, isPending }) => (
                <>
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
                                    getOptionValue={(item) => item.id as number}
                                    onChange={(item) =>
                                        field.handleChange(item)
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
                                <Combobox<Category>
                                    label="Categoria"
                                    disabled={isLoading || isPending}
                                    value={field.state.value}
                                    url="/categories"
                                    getOptionLabel={(item) => item.name}
                                    getOptionValue={(item) => item.id as number}
                                    onChange={(item) =>
                                        field.handleChange(item)
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
                                        field.handleChange(
                                            Number(e.target.value)
                                        )
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
                </>
            )}
        </Form>
    );
}
