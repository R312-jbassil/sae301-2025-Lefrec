import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8071"); // internal PB server

export async function POST({ request, cookies }) {
  try {
    const { email, password } = await request.json();

    // authenticate user
    await pb.collection("users").authWithPassword(email, password);

    // store token in cookie (HttpOnly)
    cookies.set("pb_auth", pb.authStore.token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Connexion impossible" }), { status: 401 });
  }
}
