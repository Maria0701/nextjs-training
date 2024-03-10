'use client'
import Link from 'next/link';

import styles from './link.module.css';
import { usePathname } from 'next/navigation';

export const NavLink = ({link}: {link: {title: string;path: string;}}) => {
  const pathname = usePathname();
  return (
    <Link className={`${styles.link} ${link.path === pathname ? styles.active : ''}`} href={link.path} title={link.title} key={link.path}>{link.title}</Link>
  )
}
