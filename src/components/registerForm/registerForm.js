'use client'
import { register } from "@/lib/action";
import styles from "./registerForm.module.css";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const RegisterForm = () => {
  const [state, formAction] = useFormState(register, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push('/login');
    }
  }, [state?.success, router]);
  
  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="username" name="username" />
      <input type="email" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <input
        type="password"
        placeholder="password again"
        name="passwordRepeat"
      />
      <button>Register</button>
      {Boolean(state?.error) && <p>{state.error}</p>}
      <Link href="/login">
        Have an account? <b>Login</b>
      </Link>
    </form>
  )
}

