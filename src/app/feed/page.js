import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import PostView from '@/components/PostView';
await dbConnect();
export default async function Page() {
  const posts = (await Post.find({})).map(post => ({ id: post.id, author: post.author, contents: post.contents }));
  return (
    <div>
      <ul className="flex flex-col items-center">
        {posts.map(post => (
          <li key={post.id}>
            <PostView id={post.id} author={post.author} contents={post.contents} showMore/>
          </li>
        ))}
      </ul>
    </div> 
  )
} 

