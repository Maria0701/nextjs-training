import React from 'react'
import { Links } from './links/Links';
import style from './navbar.module.css';

export const Navbar = () => {
  return (
    <div className={style.container}>
      <div>Logo</div>
      <Links />
    </div>
  )
}
