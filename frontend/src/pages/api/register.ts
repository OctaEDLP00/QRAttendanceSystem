import type { APIRoute } from 'astro';
import type { LoginResponse, Role } from '~/types';

const API_BASE = 'http://localhost:3000';

interface RegisterBody {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json() as RegisterBody;
    const { name, email, password, role } = body;

    if (!name || !email || !password || !role) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await response.json() as LoginResponse;

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: data.accessToken || 'Registration failed' }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
