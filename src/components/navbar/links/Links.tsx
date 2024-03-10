'use client'
import { useState } from 'react';
import styles from './links.module.css';
import { NavLink } from './navLink/NavLink';
import { logOutHandler } from '@/lib/action'
import Image from 'next/image';

const links = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'About',
    path: '/about',
  },
  {
    title: 'Contacts',
    path: '/contacts',
  },
  {
    title: 'Blog',
    path: '/blog',
  }
];

export const Links = ({session}: {session: any}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.links}>{links.map((link) => (
        <NavLink link={link} key={link.path} />      
      ))}
      {session 
        ? (<>
          {session.user?.isAdmin && (<NavLink link={{title:'Admin', path:'/admin'}} />)}
          <form action={logOutHandler}>
            <button className={styles.logout}>Logout</button>
          </form>
        </>)
        :(<NavLink link={{title:'login', path:'/login'}} />) }
      </div>
      <button className={styles.burger} onClick={(() =>setOpen((prev) => !prev))}>
        <Image src='/menu.png' alt='' width={30} height={30}/>
      </button>
      {open && <div className={styles.links_menu}>{links.map((link) => (
        <NavLink link={link} key={link.path} />      
      ))}
      {session?.user 
        ? (<>
          {Boolean(session.user?.isAdmin) && (<NavLink link={{title:'Admin', path:'/admin'}} />)}
          <button className={styles.logout}>Logout</button>
        </>)
        :(<NavLink link={{title:'login', path:'/login'}} />) }
      </div>}
    </div>
  )
}
