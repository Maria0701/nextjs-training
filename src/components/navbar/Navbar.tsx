import React from 'react'
import { Links } from './links/Links';
import style from './navbar.module.css';
import Link from 'next/link';
import { auth } from '@/lib/auth';

export const Navbar = async () => {
  const session = await auth();
  return (
    <div className={style.container}>
      <Link href="/" className={style.logo}>Logo</Link>
      <Links session={session}/>
    </div>
  )
}
