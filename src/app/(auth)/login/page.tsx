import { signIn} from '@/lib/auth';

const LoginPage = async () => {
  const githubLoginHandler = async () => {
    'use server'
    await signIn('github');
  };

  return (
    <div>
      <form action={githubLoginHandler}>
        <button>Login with GitHub</button>
      </form>
    </div>
  )
};

export default LoginPage;
