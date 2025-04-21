export default async function githubOAuthHandler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname === "/oauth") {
    const client_id = GITHUB_OAUTH_ID;
    const redirect_uri = url.origin + "/oauth/callback";
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=repo`;
    return Response.redirect(githubAuthUrl, 302);
  }

  if (pathname === "/oauth/callback") {
    const code = url.searchParams.get("code");
    if (!code) return new Response("Missing code", { status: 400 });

    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: new URLSearchParams({
        client_id: GITHUB_OAUTH_ID,
        client_secret: GITHUB_OAUTH_SECRET,
        code
      })
    });

    const result = await response.json();
    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response("Unsupported endpoint", { status: 404 });
}
