import { redirect } from 'next/navigation';
import Link from '@/components/Link';
export default function PostView({ id, author, contents, showMore }) {
    return (
        <div>
            <h3>{author}</h3>
            <p>{showMore ? contents.slice(0, 100) + (contents.length > 100 ? '...' : '') : contents}</p>
            {showMore ? ( <Link href={'/post/' + id}>Read more</Link> ) : <></>}
        </div>
    )
}

