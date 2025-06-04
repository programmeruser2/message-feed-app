import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
await dbConnect();
export async function GET(req) {
  const posts = (await Post.find({})).map(post => ({ id: post.id, author: post.author, contents: post.contents }));
  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: {'Content-Type': 'application/json'}
  }); 
}

