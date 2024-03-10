import { LoginForm } from '@/components/loginForm/LoginForm';
import { signIn} from '@/lib/auth';
import styles from "./login.module.css";

const LoginPage = async () => {
  const githubLoginHandler = async () => {
    'use server'
    await signIn('github');
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
      <LoginForm />
      <form action={githubLoginHandler}>
        <button className={styles.github}>Login with GitHub</button>
      </form>
      </div>
    </div>
  )
};

export default LoginPage;
