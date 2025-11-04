import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8071"); // internal server address

export async function POST({ request, cookies }) {
  const { email, password } = await request.json();

  try {
    await pb.collection("users").authWithPassword(email, password);

    // save token in HttpOnly cookie
    cookies.set("pb_auth", pb.authStore.token, {
      path: "/",
      httpOnly: true,
    //   secure: true, // must be HTTPS
      sameSite: "lax",
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Connexion impossible" }), { status: 401 });
  }
}
