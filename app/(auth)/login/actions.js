'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(prevState, formData) {
  const password = formData.get('password');
  const validPassword = process.env.BASIC_AUTH_PASSWORD;

  if (password === validPassword) {
    const cookieStore = await cookies();

    cookieStore.set('riser_auth', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
  } else {
    return { message: 'סיסמה שגויה. נסו שוב.' };
  }

  redirect('/');
}