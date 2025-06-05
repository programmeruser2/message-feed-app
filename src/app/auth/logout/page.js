'use client';
export default function Page() {
    localStorage.removeItem('username');
    localStorage.removeItem('auth');
    fetch('/api/logout').then(() => {
        location.href = '/feed';
    });
}

