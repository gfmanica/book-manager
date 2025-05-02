'use client';

import { useForm } from '@tanstack/react-form';
import { z } from 'zod';

import ErrorText from '@/components/error-text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Author, Book } from '@/types';

const authorSchema = z.object({
    id: z.number().int().nonnegative(),
    name: z.string().min(1, 'Nome é obrigatório'),
    biography: z.string().optional()
});

const defaultValues: Author = {
    id: 0,
    name: '',
    biography: ''
};

export default function AuthorForm({ id }: { id?: string }) {
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
                        Salvar
                    </Button>
                </div>
            </form>
        </div>
    );
}
