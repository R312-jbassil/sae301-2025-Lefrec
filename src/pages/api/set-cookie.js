export async function POST({ request, cookies }) {
  const { token } = await request.json();
  cookies.set('pb_auth', token, { path: '/', httpOnly: true, secure: true });
  return new Response('OK');
}
