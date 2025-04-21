export async function handleOAuthStart(request: Request, env: any): Promise<Response> {
	const client_id = env.GITHUB_OAUTH_ID;
	const redirect_uri = new URL(request.url).origin + "/oauth/callback";
	const state = crypto.randomUUID();
  
	const authUrl = `https://github.com/login/oauth/authorize` +
	  `?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=repo&state=${state}`;
  
	return Response.redirect(authUrl, 302);
  }
  
  export async function handleOAuthCallback(request: Request, env: any): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
  
	if (!code) {
	  return new Response("Missing code", { status: 400 });
	}
  
	const response = await fetch("https://github.com/login/oauth/access_token", {
	  method: "POST",
	  headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	  },
	  body: JSON.stringify({
		client_id: env.GITHUB_OAUTH_ID,
		client_secret: env.GITHUB_OAUTH_SECRET,
		code,
	  }),
	});
  
	const token = await response.json();
  
	if (token.error) {
	  return new Response(`GitHub OAuth Error: ${token.error_description || token.error}`, {
		status: 500,
		headers: { "Content-Type": "application/json" },
	  });
	}
  
	return new Response(JSON.stringify(token), {
	  headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
	  },
	});
  }
  