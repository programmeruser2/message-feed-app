'use client';
import { redirect } from 'next/navigation';
import { useState } from 'react';
export default function Page() {
  const [errorMsg, useErrorMsg] = useState('');
  async function login(formData) {
    const username = formData.get('username');
    const password = formData.get('password');
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {'Content-Type': 'application.json'}
    });
    if (res.status === 200) {
      redirect('/feed');
    } else {  
      useErrorMsg((await res.json()).error);
    }
  }
  return (
    <div>
      <h1 className="text-5xl p-10">Login</h1>
      <form action={login}>
        <label className="p-10" htmlFor="username">Username: </label>
        <input className="border-black border-1" type="text" id="username" name="username"/> <br/>
        <label className="p-10" htmlFor="password">Password: </label>
        <input className="border-black border-1 m-1" type="password" id="password" name="password"/> <br/>
        <input className="m-10 p-3 border-black border-1 hover:border-gray-100" value="Submit" type="submit"/>
      </form>
      <p className="text-red-600 mx-10">{errorMsg}</p>
    </div>
  )
}

