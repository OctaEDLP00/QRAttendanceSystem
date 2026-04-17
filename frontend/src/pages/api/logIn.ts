import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const { email, password } = await request.json();
  if (email === "" || password === "") {
    return new Response(
      JSON.stringify({ error: "Email and password are required" }),
      { status: 400 }
    );
  }

  return await fetch("", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
    }
  }).catch((error) => {
    console.error("Error during authentication:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  });

}
