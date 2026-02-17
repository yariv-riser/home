'use client';

import { useActionState } from 'react';
import { loginAction } from '@/app/(auth)/login/actions';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, { message: '' });

  return (
    <div className={styles['login-container']}>
      <form action={formAction} className={styles['login-form']} aria-label="Secure login form">

        <div className={`${styles['input-group']} input-group`}>
          <label htmlFor="password">סיסמה
            <input
              type="password"
              id="password"
              name="password"
              required
              aria-required="true"
              aria-invalid={!!state?.message}
              aria-describedby={state?.message ? "error-message" : undefined}
            />
          </label>
        </div>

        {state?.message && (
          <p id="error-message" className={styles['error-msg']} role="alert">
            {state.message}
          </p>
        )}

        <button type="submit" className={styles['submitButton']} disabled={isPending}>
          {isPending ? 'נכנס...' : 'כניסה'}
        </button>
      </form>
    </div>
  );
}