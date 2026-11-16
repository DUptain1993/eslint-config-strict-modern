export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);

    if (!key) {
      return new Response("Blob proxy active. Specify a file path.", { status: 400 });
    }

    // Fetch from your 'svc' R2 bucket binding
    const object = await env.svc.get(key);

    if (!object) {
      return new Response("File not found", { status: 404 });
    }

    return new Response(object.body, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Access-Control-Allow-Origin": "*",
      },
    });
  },
};
