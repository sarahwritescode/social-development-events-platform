

import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [jwtClient()],
});

export async function getJwtToken() {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error("Unable to generate JWT token");
  }

  return data.token;
}
