import { redirect } from 'next/navigation';
import Link from '@/components/Link';
export default function PostView({ id, author, contents, showMore }) {
    return (
        <div className="border-2 w-96 flex flex-col gap-5 mt-10 p-5">
            <h3 className="text-xl font-bold">{author}</h3>
            <p className="break-all whitespace-normal">{showMore ? contents.slice(0, 40) + (contents.length > 40 ? '...' : '') : contents}</p>
            {showMore ? ( <Link href={'/view/' + id}>Read more</Link> ) : <></>}
        </div>
    )
}

