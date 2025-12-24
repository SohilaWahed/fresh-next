import React from 'react'
import Link from 'next/link';

export default function Notfound() {
  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 dark:bg-neutral-900">
  <h1 className="text-8xl font-bold text-red-500 mb-6">404</h1>
  <h2 className="text-3xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Page Not Found</h2>
  <p className="text-gray-500 dark:text-gray-400 mb-6">Sorry, the page you are looking for does not exist.
    <i className="fa-solid fa-face-sad-tear text-2xl"></i>
  </p>
  <Link href="/" className="px-6 py-3 bg-neutral-600 text-white rounded-lg hover:bg-neutral-700 transition">
    Go Back Home
  </Link>
</div>

    </>
  )
}
