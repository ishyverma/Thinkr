import { z } from 'zod';

export const SignUpType = z.object({
    username: z.string({ message: 'Username is necessary' }),
    email: z.string({ message: 'Email is necessary' }),
    password: z.string({ message: 'Password is necessary' }),
})

export const SignInType = z.object({
    identifier: z.string().min(3),
    password: z.string()
});

export const ChatType = z.object({
    content: z.string()
})

export const CreateThread = z.object({
    name: z.string().min(2, { message: 'Name of the thread must be atleast 2 letters 🥲' }),
    userId: z.string()
})

export const RenameThread = z.object({
    name: z.string().min(2, { message: 'Name of the thread must be atleast 2 letters 🥲' }),
    id: z.string()
})