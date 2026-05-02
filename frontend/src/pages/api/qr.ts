import type { APIRoute } from 'astro';
import type { QRSession, CreateQRSessionRequest } from '~/types';

const API_BASE = 'http://localhost:3000';

export const GET: APIRoute = async ({ request, url }) => {
  try {
    const authHeader = request.headers.get('Authorization');
    const courseId = url.searchParams.get('courseId');

    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let endpoint = `${API_BASE}/qr/session`;
    if (courseId) {
      endpoint = `${API_BASE}/qr/session/${courseId}`;
    }

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
    });

    const data = await response.json() as QRSession[];

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch QR sessions' }),
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

export const POST: APIRoute = async ({ request }) => {
  try {
    const authHeader = request.headers.get('Authorization');
    const body = await request.json() as CreateQRSessionRequest;

    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch(`${API_BASE}/qr/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json() as QRSession;

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to create QR session' }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify(data), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const DELETE: APIRoute = async ({ request, url }) => {
  try {
    const authHeader = request.headers.get('Authorization');
    const sessionId = url.searchParams.get('id');

    if (!authHeader || !sessionId) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized or missing session ID' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch(`${API_BASE}/qr/session/${sessionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
    });

    const data = await response.json() as { success: boolean };

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to delete QR session' }),
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
