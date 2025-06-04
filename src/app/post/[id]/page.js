import { notFound } from 'next/navigation';
import PostView from '@/components/PostView';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';

export default async function Page({ params }) {
  const { id } = await params;
  const post = await Post.findOne({ id });
  if (!post) notFound();
  return (
    <PostView id={id} author={post.author} contents={post.contents} showMore={false} />
  )
}

