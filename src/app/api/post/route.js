import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import User from '@/models/User';
import { cookies } from 'next/headers';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';
await dbConnect();
export async function GET(req) {
  const id = req.nextUrl.searchParams.get('id');
  const post = await Post.findOne({ id });
  if (post === null) {
    return new Response('{}', {
      status: 404,
      headers: {'Content-Type': 'application/json'}
    });
  } else {
    return new Response(JSON.stringify({ id: post.id, author: post.author, contents: post.contents }), {
      status: 200,
      headers: {'Content-Type': 'application/json'}
    });
  }
}
export async function POST(req) {
  const store = await cookies();
  const { contents } = await req.json();
  let decoded;
  try {
    decoded = jwt.verify(store.get('token').value, process.env.JWT_SECRET);
  } catch (err) {
    return new Response(JSON.stringify({error:'authentication error'}), {status:401, headers:{'Content-Type':'application/json'}});
  }
  const id = nanoid();
  await Post.insertOne({ author: decoded.username, contents, id });
  return new Response(JSON.stringify({ id }), {
    status: 200,
    headers: {'Content-Type': 'application/json'}
  });
}

