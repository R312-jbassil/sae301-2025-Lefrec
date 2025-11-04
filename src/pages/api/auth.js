import { pb } from "../../../lib/pb.js";

export async function POST({ request }) {
  const { action, ...data } = await request.json();

    //différentes action possibles
  switch (action) {
    case 'login':
      return handleLogin(data);
    case 'signup':
      return handleSignup(data);
    case 'google':
      return handleGoogleAuth();
    case 'logout':
      return handleLogout();
    case 'check':
      return handleAuthCheck();
    default:
      return new Response(JSON.stringify({ ok: false, message: 'Invalid action' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
  }
}

async function handleLogin({ email, password }) {
  try {
    await pb.collection("users").authWithPassword(email, password);
    return successResponse();
  } catch (error) {
    console.error('Login failed:', error);
    return errorResponse('Invalid credentials', 401);
  }
}

async function handleSignup(data) {
  try {
    await pb.collection("users").create({
      Prenom: data.prenom,
      Nom: data.nom,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    });
    //Login direct après création
    await pb.collection("users").authWithPassword(data.email, data.password);
    return successResponse();
  } catch (error) {
    console.error('Signup failed:', error);
    return errorResponse('Could not create account');
  }
}

async function handleGoogleAuth() {
  try {
    await pb.collection("users").authWithOAuth2({ provider: "google" });
    return successResponse();
  } catch (error) {
    console.error('Google auth failed:', error);
    return errorResponse('Google authentication failed');
  }
}

async function handleLogout() {
  try {
    pb.authStore.clear();
    location.href = location.href;
    return successResponse();
  } catch (error) {
    console.error('Logout failed:', error);
    return errorResponse('Could not log out');
  }
}

async function handleAuthCheck() {
  try {
    if (pb.authStore.isValid) {
      return new Response(JSON.stringify({
        ok: true,
        user: pb.authStore.record
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({
        ok: false,
        user: null
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('Auth check failed:', error);
    return errorResponse('Could not check auth status');
  }
}

function successResponse(data = {}) {
  return new Response(JSON.stringify({ ok: true, ...data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

function errorResponse(message, status = 400) {
  return new Response(JSON.stringify({
    ok: false,
    message
  }), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}