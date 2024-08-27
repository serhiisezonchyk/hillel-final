import { signInSchema, signUpSchema } from '@/validation';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { z } from 'zod';
import { $host } from '.';

type TokenResponse = {
  token: string;
};

export const signIn = createAsyncThunk('auth/signIn', async (values: z.infer<typeof signInSchema>) => {
  try {
    const { data } = await $host.post<TokenResponse>('/auth/login', values);
    return data;
  } catch (error) {
    throw new Error('Invalid login or password: try johnd / m38rmF$');
  }
});

export const signUp = createAsyncThunk('auth/signUp', async (values: z.infer<typeof signUpSchema>) => {
  try {
    const { data } = await $host.post<TokenResponse>(
      'auth/login',
      {
        username: 'johnd',
        password: 'm38rmF$',
      },
    );

    return data;
  } catch (error) {
    console.log(error)
    throw new Error('Try again later');
  }
});
