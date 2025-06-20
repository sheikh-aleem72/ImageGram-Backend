import { z } from 'zod';

export const userSignUpSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string()
});

const emailLogin = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const usernameLogin = z.object({
  username: z.string().min(3),
  password: z.string().min(8)
});

export const userSignInSchema = z.union([emailLogin, usernameLogin]);
