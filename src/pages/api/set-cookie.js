export async function POST({ request, cookies }) {
  const { token } = await request.json();

  cookies.set("pb_auth", token, {
    path: "/",        // required
    httpOnly: true,   // secure storage, invisible to JS
    sameSite: "lax",  // or "none" if cross-domain
    // secure: true      // required for HTTPS, disable only for localhost testing
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}