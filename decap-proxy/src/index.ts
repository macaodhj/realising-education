import githubOAuthHandler from "./github";

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/oauth') {
      return new Response('OAuth start point', { status: 200 })
    }

    if (url.pathname === '/oauth/callback') {
      return new Response('OAuth callback point', { status: 200 })
    }

    return new Response('Hello 👋', {
      headers: { 'content-type': 'text/plain' },
    })
  },
}

