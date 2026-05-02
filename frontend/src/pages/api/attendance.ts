import type { APIRoute } from 'astro';
import type { Attendance, RegisterAttendanceRequest } from '~/types';

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

    let endpoint = `${API_BASE}/attendance`;
    if (courseId) {
      endpoint = `${API_BASE}/attendance/course/${courseId}`;
    }

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
    });

    const data = await response.json() as Attendance[];

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch attendance' }),
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
    const body = await request.json() as RegisterAttendanceRequest;

    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch(`${API_BASE}/attendance/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json() as Attendance;

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to register attendance' }),
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
