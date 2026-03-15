import LoginForm from '@/components/LoginForm/LoginForm';

export const metadata = {
  title: 'כניסה | רייזר',
  robots: 'noindex, nofollow',
};

export default function LoginPage() {
  return <LoginForm className="login" />;
}