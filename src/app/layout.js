import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from '@/components/Link';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const store = await cookies();
  let authenticated = false; 
  let user = null;
  try {
    const decoded = jwt.verify(store.get('token')?.value, process.env.JWT_SECRET)
    authenticated = true;
    user = decoded.username;
  } catch (err) {
    if (err.name !== 'JsonWebTokenError') throw err;
  }
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="border-3">
          <ul className="flex flex-row gap-8 p-3">
            <h1>Feed App</h1>
            <li><Link href="/feed">Feed</Link></li>
            {authenticated ? (
              <li><Link href="/auth/logout">Log Out</Link></li>
            ) : (
              <>
                <li><Link href="/auth/login">Login</Link></li>
                <li><Link href="/auth/signup">Signup</Link></li>
              </>
            )}
            {user !== null ? (<li className="ml-auto">Welcome, {user}!</li>) : <></>}
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
