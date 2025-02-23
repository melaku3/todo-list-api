import { z } from 'zod';

export const userSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }).toLowerCase(),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    name: z.string().min(3, { message: 'Name must be at least 3 characters long' })
});