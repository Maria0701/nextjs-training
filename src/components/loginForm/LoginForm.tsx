'use client'
import Link from "next/link"
import styles from "./loginForm.module.css";
import { login } from "@/lib/action";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);
  const router = useRouter();

  // useEffect(() => {
  //   if (state?.success) {
  //     router.push('/login');
  //   }
  // }, [state?.success, router])
  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
      {Boolean(state?.error) && <p>{state?.error}</p>
      }
      <Link href="/register">
        {"Don't have an account?"} <b>Register</b>
      </Link>
    </form>
  )
}
