import { handleOAuthStart, handleOAuthCallback } from "./oauth";

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/oauth") {
      return handleOAuthStart(request, env);
    } else if (url.pathname === "/oauth/callback") {
      return handleOAuthCallback(request, env);
    }

    return new Response("Not Found", { status: 404 });
  },
};
