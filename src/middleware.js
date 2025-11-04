import { defineMiddleware } from "astro:middleware";

import Pocketbase from "pocketbase";
const pb = new Pocketbase("http://127.0.0.1:8071");

export const onRequest = defineMiddleware(async ({ locals, request }, next) => {
  // Load the auth store from the cookie
  pb.authStore.loadFromCookie(request.headers.get('cookie') || '');

  // Bind the auth store to the current request
  locals.pb = pb;
  locals.user = pb.authStore.record;

  // Continue with the request
  const response = await next();

  // Send the auth cookie with the response
  response.headers.append('Set-Cookie', pb.authStore.exportToCookie({ httpOnly: false }));

  return response;
});