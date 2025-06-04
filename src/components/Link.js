'use client';
import { redirect } from 'next/navigation';
export default function Link({ href, children }) {
    return (
        <a onClick={() => redirect(href)}>{children}</a>
    )
}

