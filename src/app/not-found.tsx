import Link from 'next/link'
import React from 'react'

const notFound = () => {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Sorry, this page does not exist</p>
      <Link href='/'>To home page</Link>
    </div>
  )
}

export default notFound