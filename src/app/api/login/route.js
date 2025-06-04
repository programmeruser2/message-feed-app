import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

await dbConnect();
export async function POST(req) {
  const store = await cookies();
  const { username, password } = await req.json();
  const user = await User.findOne({ username });
  if (!user) {
    return new Response(JSON.stringify({error:'no such user'}), {
      status: 404,
      headers: {'Content-Type':'application/json'}
    });
  }
  if (await user.checkPassword(password)) {
    store.set('token', await jwt.sign({username}, process.env.JWT_SECRET, {algorithm:'HS256'}), {httpOnly:true});
    return new Response('{}', {
      status: 200,
      headers: {'Content-Type': 'application/json'}
    });
  } else {
    return new Response(JSON.stringify({error:'wrong password'}), {
      status: 401,
      headers: {'Content-Type': 'application/json'}
    });
  }
}

