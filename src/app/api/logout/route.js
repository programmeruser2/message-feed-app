import { cookies } from 'next/headers';
export async function GET(req) {
  const store = await cookies();
  store.delete('token');
  return new Response('', {status:200});
}


