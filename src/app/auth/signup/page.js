'use client';
import { useState } from 'react';
export default function Page() {
  const [errorMsg, useErrorMsg] = useState('');
  async function signup(formData) {
    const username = formData.get('username');
    const password = formData.get('password');
    const res = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {'Content-Type': 'application.json'}
    });
    if (res.status === 200) {
      localStorage.setItem('username', username);
      localStorage.setItem('auth', 'true');
      location.href = '/feed';
    } else {  
      useErrorMsg((await res.json()).error);
    }
  }
  return (
    <div>
      <h1 className="text-5xl p-10">Sign Up</h1>
      <form action={signup}>
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

