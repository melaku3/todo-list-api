import { z } from 'zod';

export const userSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }).toLowerCase(),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    name: z.string().min(3, { message: 'Name must be at least 3 characters long' })
});

export const todoSchema = z.object({
    title: z.string().toLowerCase(),
    description: z.string(),
    status: z.boolean().optional(),
    userId: z.string().length(24, {message: 'Invalid userId'})
});

export const updateTodoSchema = z.object({
    title: z.string().toLowerCase().optional(),
    description: z.string().optional(),
    status: z.boolean().optional()
});
