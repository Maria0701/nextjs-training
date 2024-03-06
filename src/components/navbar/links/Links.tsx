import Link from 'next/link'
import React from 'react'

export const Links = () => {
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
  ]
  return (
    <div>{links.map((link) => (
      <Link href={link.path} title={link.title} key={link.path}>{link.title}</Link>
    ))}</div>
  )
}
