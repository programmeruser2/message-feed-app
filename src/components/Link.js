'use client';
import { redirect } from 'next/navigation';
export default function Link({ href, children }) {
    return (
        <a className="text-blue-300 hover:underline" onClick={() => redirect(href)}>{children}</a>
    )
}

