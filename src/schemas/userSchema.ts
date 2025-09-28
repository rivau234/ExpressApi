import { z } from 'zod';
//esto es lo qu
export const userSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    email: z.string().email('Email invalido')
});

