'use client';

import { z } from 'zod';

import ErrorText from '@/components/error-text';
import { Form } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Category } from '@/types';

const categorySchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, 'Nome é obrigatório'),
    biography: z.string().optional()
});

const defaultValues: Category = {
    name: '',
    description: ''
};

export default function CategoryForm() {
    return (
        <Form<Category>
            idProperty="id"
            title="Categoria"
            endpoint="/categories"
            initialValues={defaultValues}
            validationSchema={categorySchema}
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
