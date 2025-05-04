'use client';

import { z } from 'zod';

import ErrorText from '@/components/error-text';
import { Form } from '@/components/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

export default function AuthorForm() {
    return (
        <Form<Author>
            idProperty="id"
            title="Autor"
            endpoint="/authors"
            initialValues={defaultValues}
            validationSchema={authorSchema}
        >
            {({ form, isLoading, isPending }) => (
                <>
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
                </>
            )}
        </Form>
    );
}
