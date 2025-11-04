import Pocketbase from "pocketbase";
const pb = new Pocketbase("http://127.0.0.1:8071");

export async function POST({ request }) {
    try {
        const formData = await request.formData();
        const email = formData.get("email");
        const password = formData.get("password");

        const authData = await pb.collection("users").authWithPassword(email, password);

        return new Response(JSON.stringify({
            sucess: true,
            user: authData.record
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            message: error.message
        }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}