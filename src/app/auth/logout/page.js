'use client';
import { redirect } from 'next/navigation';
export default function Page() {
    localStorage.removeItem('username');
    localStorage.removeItem('auth');
    fetch('/api/logout').then(() => redirect('/feed'));
}

