import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import PostView from '@/components/PostView';
import Link from '@/components/Link';
await dbConnect();
export default async function Page() {
  const posts = (await Post.find({})).map(post => ({ id: post.id, author: post.author, contents: post.contents }));
  return (
    <div>
      <ul className="flex flex-col items-center">
        <li className="mt-10 p-3 border-2 border-gray-300 bg-gray-100"><Link href='/post'>+ Make a post</Link></li>
        {posts.map(post => (
          <li key={post.id}>
            <PostView id={post.id} author={post.author} contents={post.contents} showMore/>
          </li>
        ))}
      </ul>
    </div> 
  )
} 

