import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import * as argon2 from 'argon2';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
await dbConnect();
export async function POST(req) {
  const { username, password } = await req.json();
  if (await User.findOne({ username })) {
    return new Response(JSON.stringify({error:'user already exists'}), {
      status: 400,
      headers: {'Content-Type': 'application/json'}
    })
  }
  const user = new User({ username });
  user.setPassword(password);
  await user.save();

  const store = cookies();
  store.set('token', await jwt.sign({username}, process.env.JWT_SECRET, {algorithm:'HS256'}), {httpOnly:true});

  return new Response(JSON.stringify({}), {
    status: 200,
    headers: {'Content-Type': 'application/json'}
  });
}

