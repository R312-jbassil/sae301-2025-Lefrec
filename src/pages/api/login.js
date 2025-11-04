import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8071");

export async function POST({ request, cookies, redirect }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const authData = await pb.collection("users").authWithPassword(email, password);

    cookies.set("pb_auth", pb.authStore.token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });

    return redirect("/");
  } catch (err) {
    console.error("Login error:", err);
    return new Response("Connexion impossible", { status: 401 });
  }
}
