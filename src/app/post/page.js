'use client';
import { redirect } from 'next/navigation';
import { useState } from 'react';
export default function Page() {
  if (localStorage.getItem('auth') !== 'true') {
    redirect('/auth/login');
  }
  const [errorMsg, useErrorMsg] = useState('');
  async function post(formData) {
    const contents = formData.get('contents');
    const res = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({ contents }),
      headers: {'Content-Type': 'application.json'}
    });
    if (res.status === 200) {
      redirect('/view/' + (await res.json()).id);
    } else {  
      useErrorMsg((await res.json()).error);
    }
  }
  return (
    <div>
      <h1 className="text-5xl p-10">Create A Post</h1>
      <form action={post}>
        <textarea className="border-black border-1 mx-10" name="contents" cols="80" placeholder="Type some text..."></textarea> <br/>
        <input className="m-10 p-3 border-black border-1 hover:border-gray-100" value="Submit" type="submit"/>
      </form>
      <p className="text-red-600 mx-10">{errorMsg}</p>
    </div>
  )
}

